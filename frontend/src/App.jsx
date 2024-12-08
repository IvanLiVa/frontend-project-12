import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import './styles/styles.css';
import Login from './pages/LoginPage/LoginPage.jsx';
import NotFound from './pages/NotFoundPage/NotFoundPage.jsx';
import useConnectSocket from './hooks/useConnectSocket.js';
import Signup from './pages/signup/Signup.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import NavbarChat from './components/Chat/navbar.jsx';
import 'react-toastify/dist/ReactToastify.css';
import CustomToastContainer from './components/toastContainer.jsx';

const rollbarConfig = {
  accessToken: 'aaa72a41996849d0abcead8546323fcb',
  environment: 'production',
};

const App = () => {
  useConnectSocket();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Router>
          <div className="d-flex flex-column h-100">
            <NavbarChat />
            <Routes>
              <Route
                path="/"
                element={
                  (
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                  )
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <CustomToastContainer />
          </div>
        </Router>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;

