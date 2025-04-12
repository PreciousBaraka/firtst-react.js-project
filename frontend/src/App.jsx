import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import NotFound from './pages/NotFound';

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/patient-dashboard' element={<PatientDashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
