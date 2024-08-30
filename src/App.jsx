import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SuspenseLoader from "./components/Common/SuspenseLoader";
import { AuthProvider } from "./components/Auth/AuthContext.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import { routes } from "./routers/routes.js";
const UserLogin = lazy(() => import("./components/user/UserLogin.jsx"));
const UserRegister = lazy(() => import("./components/user/UserRegister.jsx"));
const ForgetPassword = lazy(() =>
  import("./components/user/UserForgetPassword.jsx")
);
import ErrorComponent from "./components/Common/ErrorComponent.jsx";
import UserSession from "./components/UserSession.jsx";

const ResetPassword = lazy(() => import("./components/user/ResetPassword.jsx"));

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/register" element={<UserRegister />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route
                path={routes.main.path}
                element={
                  <ProtectedRoute>
                    <routes.main.element />
                  </ProtectedRoute>
                }
              >
                <Route
                  path={routes.main.path}
                  element={<Navigate to={`${routes.emails.path}/inbox`} />}
                />
                {/* <Route path={routes.main.path} element={<routes.main.element />}> */}
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
                <Route
                  path={routes.invalid.path}
                  element={<Navigate to={`${routes.emails.path}/inbox`} />}
                />
              </Route>

              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </Suspense>
          <UserSession />
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
