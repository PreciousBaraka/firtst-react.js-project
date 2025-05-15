import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import DashboardLayout from "./Layout";
import HospitalVisits from "./pages/HospitalVisits";
import Receptionist from "./pages/Receptionist";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import DoctorDetails from "./pages/DoctorDetails";
import Doctors from "./pages/Doctors";
import HospitalVisitDetails from "./pages/HospitalVisitDetails";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/hospital-visits' element={<HospitalVisits />} />
          <Route path='/hospital-visits/:id' element={<HospitalVisitDetails />} />
          <Route path='/receptionists' element={<Receptionist />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/patients/:id' element={<PatientDetails />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:id' element={<DoctorDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
