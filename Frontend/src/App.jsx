import { useState } from 'react'
import MainPage from './pages/MainPage/MainPage'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'


function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    {/* <MainPage/> */}
    {/* <Login/> */}
    <Chat/>
   </>
  )
}

export default App
