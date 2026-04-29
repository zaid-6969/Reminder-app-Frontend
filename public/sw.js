// Remindly Service Worker
// Must live at /public/sw.js so it serves from the root URL
// This is what fires the popup even when the browser tab is closed

self.addEventListener("push", (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || "Reminder", {
      body:               data.body  || "You have a reminder due!",
      icon:               "/favicon.svg",
      badge:              "/favicon.svg",
      tag:                data.tag   || "reminder",
      requireInteraction: true,
      vibrate:            [200, 100, 200],
      data:               data.data  || {},
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.includes(self.location.origin) && "focus" in c) return c.focus();
      }
      return clients.openWindow("/dashboard");
    })
  );
});
