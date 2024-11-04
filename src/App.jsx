import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Settings from "./components/pages/Settings";
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
    </>
  );
}

export default App;
