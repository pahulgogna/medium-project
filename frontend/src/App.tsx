import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import { RecoilRoot } from 'recoil'
import CreateBlog from './pages/CreateBlog'
import AppBar from './components/AppBar'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <RecoilRoot>
          <AppBar/>
          <Routes>
            <Route path='/' element = <LandingPage/> />
            <Route path='/signup' element = <Signup />/>
            <Route path='/signin' element = <Signin />/>
            <Route path='/blog/:id' element = <Blog />/>
            <Route path='/blogs' element = <Blogs />/>
            <Route path='/blogs/create' element = <CreateBlog />/>
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </>
  )
}

export default App
