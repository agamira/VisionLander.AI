import { Route, Routes } from "react-router-dom";
import "./assets/sass/main.scss";
import { Home, Root } from "./pages";
import { LogIn } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
