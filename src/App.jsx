import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import MainLayout from "./layouts/MainLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import DashboardUser from "./pages/user/Dashboard.jsx";
import Accounts from "./pages/admin/Accounts.jsx";
import ListOfSuc from "./pages/admin/ListOfSuc.jsx";
import Schools from "./pages/user/Schools.jsx";
import Members from "./pages/user/Members.jsx";
import Loading from "./components/loading-components/Loading.jsx";
import Profile from "./pages/user/Profile.jsx";
import Programs from "./pages/user/Programs.jsx";

const LoginPage = lazy(() => import("./pages/login/LoginPage.jsx"));

import "leaflet/dist/leaflet.css";
import Documents from "./pages/user/Documents.jsx";
import ReferendumPage from "./pages/user/subpages/ReferendumPage.jsx";
import ResolutionPage from "./pages/user/subpages/ResolutionPage.jsx";
import RefTravel from "./components/user-components/documentComponents/RefTravel.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            }
          />

          <Route path="suc" element={<ListOfSuc />} />
          <Route path="member" element={<Accounts />} />
        </Route>

        <Route path="user" element={<UserLayout />}>
          <Route index element={<DashboardUser />} />
          <Route path="school" element={<Schools />} />
          <Route path="member" element={<Members />} />
          <Route path="profile" element={<Profile />} />
          <Route path="program" element={<Programs />} />
          <Route path="documents" element={<Documents />}>
            <Route path="ref" element={<ReferendumPage />}>
              <Route path="travel" element={<RefTravel />} />
            </Route>
            <Route path="reso" element={<ResolutionPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
