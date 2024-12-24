import React, { useContext } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Home from './Home';
import { UserContext } from './context';

function App(): React.JSX.Element {
// userContext?.data
  const userContext = useContext(UserContext);
  const isUser = userContext?.data?.username;
  const router = createBrowserRouter([
    { path: "/admin/auth/login", element: !isUser ? <Login /> : <Navigate to={"/admin"} /> },
    { path: '/admin', element: isUser ? <Home /> : <Navigate to={"/admin/auth/login"} /> }
  ],);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
