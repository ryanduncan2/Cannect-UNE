import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Users from './Pages/Users';
import User from './Pages/User';
import Clinics from './Pages/Clinics';
import Clinic from './Pages/Clinic';
import Feedback from './Pages/Feedback';
import ClinicEdit from './Pages/ClinicEdit';
import ErrorHandle from './Auth/ErrorHandle';
import UserEdit from './Pages/UserEdit';
//import ClinicEdit from './Pages/ClinicEdit';





const router = createBrowserRouter([

  {
    path:"/",
    element:<Login/>,
    errorElement:<ErrorHandle/> 
  },
  {
    path:"/admin",
    element:<Admin/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/users",
    element:<Users/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/users/:id",
    element:<User/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/users/:id/edit",
    element:<UserEdit/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/clinics",
    element:<Clinics/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/clinics/:id",
    element:<Clinic/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/clinics/:id/edit",
    element:<ClinicEdit/>,
    errorElement:<ErrorHandle/>
  },
  {
    path:"/admin/feedback",
    element:<Feedback/>,
    errorElement:<ErrorHandle/>
  },
  
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router ={router}/> 
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
