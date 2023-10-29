import { Route, Routes } from "react-router-dom";
import "./assets/sass/main.scss";
import {
  Root,
  Home,
  PrivacyPolicy,
  TermsOfUse,
  Redactor,
  NotFound,
} from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/redactor" element={<Redactor />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
