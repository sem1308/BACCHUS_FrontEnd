import Login from './components/login';
import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Dinner from './pages/Dinner';
import DinnerDetail from './pages/DinnerDetail';

function App() {
  return (
    <Routes>
      <Route path="/dinner" element={<Dinner />} />
      <Route path="/dinner/:dinnerNum" element={<DinnerDetail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;