import { ROUTER } from './constant/Router'
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Basket from "./components/Basket"
import Favourite from "./components/Favourite"
import  GoDetailsPage from "./components/GoDetailsPage"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTER.Home} element={<Home />} />
        <Route path={ROUTER.Basket} element={<Basket />} />
        <Route path={ROUTER.Favourite} element={<Favourite/>}/>
        <Route path={ROUTER.GoDetailsPage} element={<GoDetailsPage/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
