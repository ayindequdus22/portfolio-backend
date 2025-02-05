import React, { useContext } from 'react'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login';
import { UserContext } from './context';
import AddProject from './AddProject';
import Projects from './project/Projects';
import Project from './project/Project';

function App(): React.JSX.Element {

  const userContext = useContext(UserContext);
  const isUser = userContext?.data?.[0]?.email;


  if (userContext?.isLoading) {
    return <h1>Is Loading</h1>
  }
  const router = createBrowserRouter([
    {
      path: "/", element: <><Navigate to={"/admin/projects"} />
      </>
    },
    {
      path: "admin", children: [
        { path: "/admin/", element: isUser ? <>
        Go to admin/projects
        </> : <Navigate to={"/admin/auth/login"} />, },

        { path: "/admin/auth/login", element: !isUser ? <Login /> : <Navigate to={"/admin"} />, },
        { path: '/admin/add-project', element: isUser ? <AddProject /> : <Navigate to={"/admin/auth/login"} /> },
        {
          path: '/admin/projects', element: <>
            <Outlet /></>,
          children: [
            {
              path: '/admin/projects', element: isUser ? <Projects /> : <Navigate to={"/admin/auth/login"} />,
            },
            { path: "/admin/projects/:id", element: <Project /> }
          ]
        },
        { path: "*", element: <>Not found</> }
      ],

    }
  ],);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
