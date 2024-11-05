import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation'; // Assuming you have a Navigation component

function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;