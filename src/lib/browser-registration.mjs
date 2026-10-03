const key = "diaryspark-registration-status";
const eventName = "diaryspark-registration-change";
let currentStatus = null;

// This is a label hint for the last checked account, never authentication state.
export function getRegistrationStatus() {
  try {
    const stored = window.sessionStorage.getItem(key);
    if (stored === "registered" || stored === "unregistered") currentStatus = stored;
  } catch { /* Keep the current tab's hint when browser storage is unavailable. */ }
  return currentStatus;
}

export function getServerRegistrationStatus() { return null; }

export function rememberRegistration(registered) {
  currentStatus = registered ? "registered" : "unregistered";
  try { window.sessionStorage.setItem(key, currentStatus); }
  catch { /* Updating the button must not interrupt authentication. */ }
  window.dispatchEvent(new Event(eventName));
}

export function subscribeRegistration(callback) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
}
