import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderedListPage from './pages/OrderedListPage';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import DinnerPage from './pages/customer/DinnerPage';
import OrderDinnerPage from './pages/customer/OrderDinnerPage';
import EmpHomePage from './pages/employee/EmpHomePage';
import EmpWorkingPage from './pages/employee/EmpWorkingPage';
import EmpManagePage from './pages/employee/EmpManagePage';
import EmpRegisterPage from './pages/EmpRegisterPage';
import HomePage from './pages/customer/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dinner" element={<DinnerPage />} />
      <Route path="/dinner/:dinnerNum" element={<OrderDinnerPage />} />
      <Route path="/ordered_list" element={<OrderedListPage />} />
      <Route path="/audio" element={<OrderedListPage />} />

      <Route path="/login/" element={<LoginPage type='customer' />} />
      <Route path="/register/" element={<RegisterPage/>} />

      <Route path="/register/employee" element={<EmpRegisterPage/>} />
      <Route path="/login/employee" element={<LoginPage type='employee' />} />
      <Route path="/employee" element={<EmpHomePage />} />
      <Route path="/working/employee/:stateType" element={<EmpWorkingPage />} />
      <Route path="/food/employee" element={<EmpManagePage which='food' />} />
      <Route path="/dinner/employee" element={<EmpManagePage which='dinner' />} />
    </Routes>
  );
}

export default App;