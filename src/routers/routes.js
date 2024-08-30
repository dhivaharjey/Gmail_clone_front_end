import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/Dashboard.jsx"));
const Mailspage = lazy(() => import("../components/MailsPage.jsx"));
const ViewEmail = lazy(() => import("../components/ViewEmail.jsx"));
const routes = {
  main: {
    path: "/",
    element: Dashboard,
  },
  emails: {
    path: "/emails",
    element: Mailspage,
  },

  view: {
    path: "/view",
    element: ViewEmail,
  },
  invalid: {
    path: "/*",
    element: Mailspage,
  },
};
export { routes };
