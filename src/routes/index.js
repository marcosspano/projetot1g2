import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/Home/";
import {Login} from "../pages/Login";
import { Register } from "../pages/Register";
import { HelmetProvider } from 'react-helmet-async';
import { Header } from "../pages/Home/components/Header";
import Footer from "../pages/Home/components/Footer/Footer";
import Detalhes from "../pages/Detalhes";
import Reserva from "../pages/Reserva";
import { Admin } from '../pages/Admin';

import { useSession } from '../hooks/useSession';

function PrivateRoute({ children }) {
  const { session } = useSession();
  const location = useLocation();

  return session.user ? children : (
    <Navigate 
      to="/login"
      state={{from: location}}
      replace
    />
  );
}

function AdminRoute({ children }) {
  const { session } = useSession();
  const location = useLocation();
  return session.user.credentialAcess === "ADMIN" ? children : (
    <Navigate 
      to="/login"
      state={{from: location}}
      replace
    />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/produto/detalhes/:id" element={<Detalhes/>}/>
          <Route path="/reserva/produto/:id" element={
            <PrivateRoute>
              <Reserva/>
            </PrivateRoute>
          }/>
          <Route path="/administrador" element={
            <AdminRoute>
              <Admin/>
            </AdminRoute>
          }/>
        </Routes>
        <Footer/>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default Router;


