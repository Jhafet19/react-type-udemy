import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Cuentas from "./pages/Cuentas"
import Dashboard from "./pages/Dashboard"
import Inicio from "./pages"




function App() {


  return (
    <>
      <div className="">
        <Navbar />
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='/cuentas/:id' element={<Cuentas />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>


      </div>
    </>
  )
}

export default App
