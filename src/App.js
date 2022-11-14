import Login from './components/login';
import History from './components/History';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import DinnerPage from './pages/customer/DinnerPage';
import DinnerDetailPage from './pages/customer/DinnerDetailPage';
import EmpHomePage from './pages/employee/EmpHomePage';
import EmpManagePage from './pages/employee/EmpManagePage';
import Register from './components/register';

function App() {
  return (
    <Routes>
      <Route path="/dinner" element={<DinnerPage />} />
      <Route path="/dinner/:dinnerNum" element={<DinnerDetailPage />} />
      <Route path="/history/:customerNum" element={<History />} />
      <Route path="/login/" element={<Login type='customer' />} />
      <Route path="/login/employee" element={<Login type='employee' />} />
      <Route path="/employee" element={<EmpHomePage />} />
      <Route path="/food/employee" element={<EmpManagePage which='food' />} />
      <Route path="/dinner/employee" element={<EmpManagePage which='dinner' />} />


      <Route path="/login/register" element={<Register />} />
    </Routes>
  );
}

export default App;