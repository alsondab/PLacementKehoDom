import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, hideNavbar = false, hideFooter = false }) {
  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
} 