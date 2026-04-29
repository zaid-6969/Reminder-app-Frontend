export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    return await navigator.serviceWorker.register("/service-worker.js");
  }
};

// 🔑 Fetch VAPID public key from backend
const getPublicKey = async () => {
  const res = await fetch("http://localhost:5000/api/v1/push/vapid-public-key");
  const data = await res.json();
  return data.publicKey;
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

// 📡 Subscribe user
export const subscribeUser = async () => {
  const registration = await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const publicKey = await getPublicKey();

  const convertedKey = urlBase64ToUint8Array(publicKey);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  return subscription;
};