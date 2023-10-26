import { Route, Routes } from "react-router-dom";
import "./assets/sass/main.scss";
import { Root, Home, PrivacyPolicy, TermsOfUse } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
