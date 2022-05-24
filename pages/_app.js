import React from 'react';

import '../styles/globals.css';
import { NavBar } from '../components';
import { FooterBanner } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
      <FooterBanner />
    </>
  );
}

export default MyApp;
