import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { NavigateSetter } from 'utils/history';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();
root.render(
    <React.StrictMode>
        <Router >
            <NavigateSetter/>
            <GlobalStyles>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </Provider>
            </GlobalStyles>
        </Router>
    </React.StrictMode>
);
reportWebVitals();
