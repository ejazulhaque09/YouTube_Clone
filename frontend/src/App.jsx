import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Video from './pages/Video'
import VideoUpload from './pages/VideoUpload'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

import { useState } from 'react'

function App() {
  // state to manage the visibility of the side navbar
  const [sideNavbar, setSideNavbar] = useState(false)
  //function to update the side navbar
  const setSideNavbarfun = (value) => {
    setSideNavbar(value)
  }
  const [search, setSearch] = useState('');
  return (
    <div className="App">
      <Navbar setSideNavbarFunc = {setSideNavbarfun} sideNavbar={sideNavbar} setSearch = {setSearch} />
      <Routes>
        {/* Routes to define the application navigation */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home sideNavbar={sideNavbar} search={search} />
          </ProtectedRoute>
        } />
        <Route path='/watch/:id' element={
          <ProtectedRoute>
            <Video sideNavbar={sideNavbar} />
          </ProtectedRoute>
        } />
        <Route path='/user/:id' element={
          <ProtectedRoute>
            <Profile sideNavbar={sideNavbar} />
          </ProtectedRoute>
        } />
        <Route path='/:id/upload' element={
          <ProtectedRoute adminOnly={true}>
            <VideoUpload />
          </ProtectedRoute>
        } />
        <Route path='/:videoId/edit' element={
          <ProtectedRoute adminOnly={true}>
            <VideoUpload />
          </ProtectedRoute>
        } />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
