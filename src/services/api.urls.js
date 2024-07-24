export const API_URLS = {
  saveSentEmail: {
    endpoint: "save",
    method: "POST",
  },
  getEmailFromType: {
    endpoint: "emails",
    method: "GET",
  },
  saveDraftEmails: {
    endpoint: "save-draft",
    method: "POST",
  },
  moveEmailsToTrash: {
    endpoint: "trash",
    method: "POST",
  },
  toggleStarredEmail: {
    endpoint: "starred",
    method: "POST",
  },
  toggleSnoozedEmail: {
    endpoint: "snooze",
    method: "POST",
  },
  deleteEmailPermanently: {
    endpoint: "delete",
    method: "DELETE",
  },
};
