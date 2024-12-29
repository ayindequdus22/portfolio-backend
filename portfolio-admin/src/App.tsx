import React, { useContext } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import Home from './Home';
import { UserContext } from './context';
import AddProject from './AddProject';

function App(): React.JSX.Element {
 
// userContext?.data
  const userContext = useContext(UserContext);
  // const isUser = userContext?.data?.[0]?.email;
  const isUser = true;

  if(userContext?.isLoading){
  return <h1>Is Loading</h1>
}
  const router = createBrowserRouter([
    {path:"/",element:<><Navigate to={"/admin"}/>
    </>},
    { path: "/admin/auth/login", element: !isUser ? <Login /> : <Navigate to={"/admin"} /> },
    { path: '/admin/add-project', element: isUser ? <AddProject/> : <Navigate to={"/admin/auth/login"} /> },
    { path: '/admin', element: isUser ? <Home /> : <Navigate to={"/admin/auth/login"} /> }
  ],);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
