const key = "diaryspark-registration-status";
const eventName = "diaryspark-registration-change";
let currentStatus = null;

// This is a label hint for the last checked account, never authentication state.
export function getRegistrationStatus() {
  let stored;
  try { stored = window.sessionStorage.getItem(key); }
  catch { /* Storage may be unavailable in private or restricted browsers. */ }
  try { stored = window.localStorage.getItem(key) ?? stored; }
  catch { /* Fall back to this tab's session hint. */ }
  if (stored !== undefined) {
    currentStatus = stored === "registered" || stored === "unregistered" ? stored : null;
  }
  return currentStatus;
}

export function getServerRegistrationStatus() { return null; }

export function rememberRegistration(registered) {
  currentStatus = registered ? "registered" : "unregistered";
  try { window.sessionStorage.setItem(key, currentStatus); }
  catch { /* Updating the button must not interrupt authentication. */ }
  try { window.localStorage.setItem(key, currentStatus); }
  catch { /* Keep the in-memory and session hint if persistent storage is blocked. */ }
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
