import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Home from './Home';

function App(): React.JSX.Element {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },{path:'',element:<Home/>}
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
