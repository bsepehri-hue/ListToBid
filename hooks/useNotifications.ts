// --- Notifications ---
match /notifications/{notifId} {
  
  // Allow listing/querying notifications, but only if the user is authenticated.
  allow list: if request.auth != null;

  // Allow reading a notification only if it belongs to the authenticated user.
  allow read: if request.auth != null
              && request.auth.uid == resource.data.userId;

  // Allow writing a notification only if it belongs to the authenticated user.
  allow write: if request.auth != null
               && request.auth.uid == resource.data.userId;
}