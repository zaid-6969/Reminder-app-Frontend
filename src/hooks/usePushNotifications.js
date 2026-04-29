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
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("[Push] Not supported in this browser");
      return;
    }

    const setup = async () => {
      try {
        // 1. Register service worker — file must be at /public/sw.js
        const reg = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;
        console.log("[Push] Service worker registered");

        // 2. Ask permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("[Push] Permission denied by user");
          return;
        }

        // 3. Check if already subscribed — reuse existing subscription
        let subscription = await reg.pushManager.getSubscription();

        if (!subscription) {
          // 4. Not subscribed yet — get VAPID key and subscribe
          const { data } = await api.get("/push/vapid-public-key");
          if (!data.publicKey) {
            console.warn("[Push] No VAPID public key from server — add VAPID_PUBLIC_KEY to backend .env");
            return;
          }

          subscription = await reg.pushManager.subscribe({
            userVisibleOnly:      true,
            applicationServerKey: urlBase64ToUint8Array(data.publicKey),
          });
          console.log("[Push] New subscription created");
        } else {
          console.log("[Push] Reusing existing subscription");
        }

        // 5. Always send subscription to backend so it's saved in DB
        await api.post("/push/subscribe", subscription.toJSON());
        console.log("[Push] ✅ Subscription saved to backend — notifications are active");

      } catch (err) {
        console.warn("[Push] Setup failed:", err.message);
      }
    };

    setup();
  }, [token]);
}