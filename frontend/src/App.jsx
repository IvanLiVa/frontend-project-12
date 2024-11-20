import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import './styles/styles.css';
import Login from './pages/LoginPage/LoginPage.jsx';
import NotFound from './pages/NotFoundPage/NotFoundPage.jsx';
import RedirectToPage from './components/RedirectToPage';

const App = () => {
  return (
    <Router>
      <RedirectToPage />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
