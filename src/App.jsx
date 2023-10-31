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
import { useMediaQuery } from "./hooks/useMediaQuery";

function App() {
  const matches = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
        {matches ? (
          <Route path="/redactor" element={<Redactor />} />
        ) : (
          <Route path="/redactor" element={<h1>Please use Computer</h1>} />
        )}
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
