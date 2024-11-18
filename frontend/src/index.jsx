/* eslint-disable functional/no-expression-statement */
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App';

const rootElement = document.getElementById('chat');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
