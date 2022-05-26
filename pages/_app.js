import React from 'react';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';
import { NavBar } from '../components';
import { FooterBanner } from '../components';
import { StateContext } from '../context/stateContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateContext>
        <Toaster />
        <NavBar />
        <Component {...pageProps} />;
        <FooterBanner />
      </StateContext>
    </>
  );
}

export default MyApp;
