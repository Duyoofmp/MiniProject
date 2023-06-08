import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./components/errorPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EmpLogin from './components/empLogin';
import ManagerSignInOut from './container/SignInOut';
import MiniDrawer from './components/Dashboard/Sidebar.tsx';
import About from './components/Dashboard/Pages/about';
import Home from './components/Dashboard/Pages/home';
import Settings from './components/Dashboard/Pages/settings';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Employee",
    element: <EmpLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Manager",
    element: <ManagerSignInOut />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Dashboard",
    element: <MiniDrawer />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/About",
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
