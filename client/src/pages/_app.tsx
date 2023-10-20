import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import TestRunContextProvider from '@/context/TestRunContext';

const clientSideEmotionCache = createEmotionCache();

const App = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles styles={{ '#__next': { height: '100vh', fontSize: '13px' } }} />
        <CssBaseline />
        <TestRunContextProvider>
          <Component {...pageProps} />
        </TestRunContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;