import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'urql';
import App from './App';
import { client } from './graphql/client';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
