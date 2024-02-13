import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import AddChauf from "../pages/AddChauf";
import SellCom from "../pages/SellCom";
import EditChauff from "../pages/EditChauff";

const Router = () => {
  return (
    <Routes>
      <Route
        path=" "
        element={<Navigate to="dashboard " element={<Dashboard />} />}>
     
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="sell-car" element={<SellCar />} />
      <Route path="settings" element={<Settings />} />
      <Route path="chauff" element={<AddChauf/>}/>
      <Route path="commande" element={<SellCom />}/>
      <Route path="Editchauff/:id" element={<EditChauff />} />
     
      </Route>
      </Routes>
  );
};

export default Router;
