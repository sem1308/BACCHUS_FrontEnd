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
import MiddleWare from './MiddleWare';
import ManageEmpPage from './pages/ManageEmpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MiddleWare auth='CUSTO' component={<HomePage/>}/>} />
      <Route path="/dinner" element={<MiddleWare auth='CUSTO' component={<DinnerPage/>}/>} />
      <Route path="/dinner/:dinnerNum" element={<MiddleWare auth='CUSTO' isLogin={true} component={<OrderDinnerPage/>}/>} />
      <Route path="/ordered_list" element={<MiddleWare auth='CUSTO' isLogin={true} component={<OrderedListPage/>}/>} />

      <Route path="/login/" element={<LoginPage type='customer' />} />
      <Route path="/register/" element={<RegisterPage/>} />
      <Route path="/manage/employee/:isApproved" element={<MiddleWare auth='ADMIN' isLogin={true} type='employee' component={<ManageEmpPage/>}/>} />

      <Route path="/register/employee" element={<EmpRegisterPage/>} />
      <Route path="/login/employee" element={<LoginPage type='employee' />} />
      <Route path="/employee" element={<MiddleWare auth='EMPLO' isLogin={true} type='employee' component={<EmpHomePage/>}/>} />
      <Route path="/working/employee/:stateType" element={<MiddleWare auth='EMPLO' isLogin={true} type='employee' component={<EmpWorkingPage />}/>} />
      <Route path="/food/employee" element={<MiddleWare auth='EMPLO' isLogin={true} type='employee' component={<EmpManagePage which='food' />}/>} />
      <Route path="/dinner/employee" element={<MiddleWare auth='EMPLO' isLogin={true} type='employee' component={<EmpManagePage which='dinner' />}/>} />
    </Routes>
  );
}

export default App;