
import { matchPath, Outlet, useLocation, useMatch } from 'react-router-dom'
import Navigation from './components/homePage/Navigation';
import {Camera} from "lucide-react";
import { useState } from 'react';



const RootLayout = () => {
 const location = useLocation();
    // routes where Navigation should appear
  const showOnRoutes = ["/", "/login", "/signup"];

    // check if current path matches any of them
  const shouldShowNavigation = showOnRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  return (<>
       
  {shouldShowNavigation && <Navigation Camera={Camera} />}

 
 <Outlet/>
  
  </>
  )
}

export default RootLayout