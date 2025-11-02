import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<h1>HOME</h1>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<h1>Login</h1>} />
      </Routes>
    </>
  )
}

export default App
