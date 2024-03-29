import { Route, Routes } from "react-router-dom";
import {
  Home,
  NotFound,
  PrivacyPolicy,
  Redactor,
  Root,
  TermsOfUse,
  UserDashboard,
  ForgotPassword,
} from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/redactor/:siteId" element={<Redactor />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Route>
      <Route path="/forgot-password/:userId" element={<ForgotPassword />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { Routing };
