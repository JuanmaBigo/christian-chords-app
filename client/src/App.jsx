import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { router } from './pages/index';


function App() {

  return (
    <BrowserRouter>
      {router}
    </BrowserRouter>
  )
}

export default App
