
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Header from "./components/Header"
import Main from "./components/Main"
import Settings from "./components/Settings"
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" >
            <Route index element={<Main />} />
            <Route path="/settings" element={<Settings />} />       
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
