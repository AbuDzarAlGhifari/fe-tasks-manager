import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="min-h-screen">
    <Header />
    <main className="container mx-auto">{children}</main>
  </div>
);

export default Layout;
