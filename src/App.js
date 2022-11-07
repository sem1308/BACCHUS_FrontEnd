import Login from './components/login';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Dinner from './pages/customer/Dinner';
import DinnerDetail from './pages/customer/DinnerDetail';
import EmployeeHome from './pages/employee/EmpHome';
import EmpManage from './pages/employee/EmpManage';

function App() {
  return (
    <Routes>
      <Route path="/dinner" element={<Dinner />} />
      <Route path="/dinner/:dinnerNum" element={<DinnerDetail />} />
      <Route path="/login/" element={<Login type='customer'/>} />
      <Route path="/login/employee" element={<Login type='employee'/>} />
      <Route path="/employee" element={<EmployeeHome/>} />
      <Route path="/food/employee" element={<EmpManage which='food'/>} />
      <Route path="/dinner/employee" element={<EmpManage which='dinner'/>} />
    </Routes>
  );
}

export default App;