
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Main from "./components/Main"
import Settings from "./components/Settings"
import Footer from "./components/Footer"
import { useEffect } from "react"
function App() {
  useEffect(() => {
    window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});
  },[])
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Main />} />
            <Route path="/settings" element={<Settings />} />       
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
