import { Route, Routes } from "react-router-dom";
import {
  Home,
  NotFound,
  PrivacyPolicy,
  Redactor,
  Root,
  TermsOfUse,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
      </Route>
      <Route
        path="/redactor"
        element={
          // <PrivateRoute redirectTo="/">
          <Redactor />
          /* </PrivateRoute> */
        }
      />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { Routing };
