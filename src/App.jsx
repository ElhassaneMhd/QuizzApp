import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Settings from "./components/pages/Settings";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Main />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
