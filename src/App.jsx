import React, { Suspense, lazy, useState } from "react";
// import NavBar from "./components/NavBar.jsx";
// import LeftSideBar from "./components/LeftSideBar/LeftSideBar.jsx";
// import RightSideBar from "./components/RightSideBar/RightSideBar.jsx";
// import InboxMails from "./components/InboxMails.jsx";
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { routes } from "./routers/routes.js";
const ErrorComponent = lazy(() =>
  import("./components/Common/ErrorComponent.jsx")
);
import SuspenseLoader from "./components/Common/SuspenseLoader.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// const Dashboard = lazy(() => import("./pages/MainPages.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={routes.main.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route
          path={`${routes.emails.path}/:type`}
          element={<routes.emails.element />}
          errorElement={<ErrorComponent />}
        />
        <Route
          path={routes.view.path}
          element={<routes.view.element />}
          errorElement={<ErrorComponent />}
        />
      </Route>
      <Route
        path={routes.invalid.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
    </Route>
  )
);

function App() {
  // const [openDrawer, setOpenDrawer] = useState(false);
  // const toggleDrawer = () => {
  //   setOpenDrawer((prevState) => !prevState);
  // };
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <RouterProvider router={router} />
      </Suspense>
      {/* <Suspense fallback={<SuspenseLoader />}>
        <BrowserRouter>

          <Routes>

            <Route
              path="/inbox"
              element={<MainPages />}
              errorElement={<ErrorComponent />}
            />
            <Route
              path="/*"
              element={<Navigate to="/inbox" />}
              errorElement={<ErrorComponent />}
            />
          </Routes>
        </BrowserRouter>
      </Suspense> */}
    </>
  );
}

export default App;
