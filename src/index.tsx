import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Router>
            <GlobalStyles>
                <Provider store={store}>
                    <App />
                </Provider>
            </GlobalStyles>
        </Router>
    </React.StrictMode>
);
reportWebVitals();
