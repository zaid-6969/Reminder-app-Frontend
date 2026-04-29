import { useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api/axios";

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64  = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw     = window.atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
};

export default function usePushNotifications() {
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (!token) return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const setup = async () => {
      try {
        // 1. Register the service worker
        const reg = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;

        // 2. Ask user for notification permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        // 3. Get VAPID public key from backend
        const { data } = await api.get("/push/vapid-public-key");
        if (!data.publicKey) return;

        // 4. Subscribe this browser to push
        const subscription = await reg.pushManager.subscribe({
          userVisibleOnly:      true,
          applicationServerKey: urlBase64ToUint8Array(data.publicKey),
        });

        // 5. Send subscription to backend — cron will use it to push notifications
        await api.post("/push/subscribe", subscription.toJSON());
        console.log("[Push] Browser subscribed for background notifications");
      } catch (err) {
        // Silent fail — email fallback still works
        console.warn("[Push] Setup skipped:", err.message);
      }
    };

    setup();
  }, [token]);
}
