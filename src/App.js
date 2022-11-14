import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import History from './components/History';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import DinnerPage from './pages/customer/DinnerPage';
import DinnerDetailPage from './pages/customer/DinnerDetailPage';
import EmpHomePage from './pages/employee/EmpHomePage';
import EmpManagePage from './pages/employee/EmpManagePage';

function App() {
  return (
    <Routes>
      <Route path="/dinner" element={<DinnerPage />} />
      <Route path="/dinner/:dinnerNum" element={<DinnerDetailPage />} />
      <Route path="/history/:customerNum" element={<History />} />

      <Route path="/login/" element={<LoginPage type='customer' />} />
      <Route path="/register/" element={<RegisterPage type='customer' />} />

      <Route path="/login/employee" element={<LoginPage type='employee' />} />
      <Route path="/employee" element={<EmpHomePage />} />
      <Route path="/food/employee" element={<EmpManagePage which='food' />} />
      <Route path="/dinner/employee" element={<EmpManagePage which='dinner' />} />
    </Routes>
  );
}

export default App;