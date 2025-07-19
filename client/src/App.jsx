import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import AddEmployee from './pages/Admin/Addemployee/Addemployee'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
    <Header />
    <Routes>
       <Route path='/' element = {<Home />}></Route>
       <Route path='/login' element = {<Login />}></Route>
       <Route path='/add-employee' element = {<AddEmployee />}></Route>
    </Routes>
    <Footer />
  </>
  )
}

export default App
