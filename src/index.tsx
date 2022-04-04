import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import ScrollToTop from './components/ScrollToTop';
import { QueryClientProvider } from 'react-query';
import queryClient from './config/query';
import PageLoading from './components/PageLoading';
import "./i18n";
import { Provider } from "react-redux";
import store from './config/store';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <QueryClientProvider client={queryClient}>
              <SnackbarProvider>
                <Suspense fallback={<PageLoading />}>
                  <ScrollToTop />
                  <App />
                </Suspense>
              </SnackbarProvider>
            </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
