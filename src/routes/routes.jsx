import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register.jsx";
import DashBoard from "../pages/dashboard/DashBoard.jsx";
import PrivateRoutes from "./private/PrivateRoutes.jsx";
import DashBoearMenu from "../pages/dahsboardMenu/DashBoearMenu.jsx";
import BookParcel from "../pages/UserDashboard/BookParcel.jsx";
import MyParcel from "../pages/UserDashboard/MyParcel.jsx";
import AllUsers from "../pages/adminDashboard/AllUsers.jsx";
import AllParcels from "../pages/adminDashboard/AllParcels.jsx";
import AllDeliverayMan from "../pages/adminDashboard/AllDeliverayMan.jsx";
import AdminStats from "../pages/adminDashboard/AdminStats.jsx";
import MyReviews from "../pages/deliveryDashboeard/MyReviews.jsx";
import MyDeliveryList from "../pages/deliveryDashboeard/MyDeliveryList.jsx";
import Update from "../pages/update/Update.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <DashBoard></DashBoard>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "/dashboard/:id",
            element: <DashBoearMenu></DashBoearMenu>,
          },
          {
            path: "/dashboard/bookparcel",
            element: <BookParcel></BookParcel>,
          },
          {
            path: "/dashboard/myparcel",
            element: <MyParcel></MyParcel>,
          },
          {
            path: "/dashboard/admin/allusers",
            element: <AllUsers></AllUsers>,
          },
          {
            path: "/dashboard/admin/allparcels",
            element: <AllParcels></AllParcels>,
          },
          {
            path: "/dashboard/admin/allparcels",
            element: <AllParcels></AllParcels>,
          },
          {
            path: "/dashboard/admin/allDeliveryMan",
            element: <AllDeliverayMan></AllDeliverayMan>,
          },
          {
            path: "/dashboard/admin/statistics",
            element: <AdminStats></AdminStats>,
          },
          {
            path: "/dashboard/reviews",
            element: <MyReviews></MyReviews>,
          },
          {
            path: "/dashboard/MyDeliveryList",
            element: <MyDeliveryList></MyDeliveryList>,
          },
          {
            path: "/dashboard/update/:id",
            element: <Update></Update>,
            loader: ({ params }) =>
              fetch(
                `https://assaignment12-server-site.vercel.app/dashboard/update/${params.id}`
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
