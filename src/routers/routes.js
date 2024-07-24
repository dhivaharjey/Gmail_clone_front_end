import { lazy } from "react";
// import InboxMails from "../components/InboxMails.jsx";
// import MainPages from "../pages/MainPages.jsx";
const MainPages = lazy(() => import("../pages/Dashboard.jsx"));
const InboxMails = lazy(() => import("../components/MailsPage.jsx"));
const ViewEmail = lazy(() => import("../components/ViewEmail.jsx"));
const routes = {
  main: {
    path: "/",
    element: MainPages,
  },
  emails: {
    path: "/emails",
    element: InboxMails,
  },

  view: {
    path: "/view",
    element: ViewEmail,
  },
  invalid: {
    path: "/*",
    element: InboxMails,
  },
};
export { routes };
