import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DashboardLayout from "./Layout";
import HospitalVisits from "./pages/HospitalVisits";
import Receptionist from "./pages/Receptionist";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import DoctorDetails from "./pages/DoctorDetails";
import Doctors from "./pages/Doctors";
import HospitalVisitDetails from "./pages/HospitalVisitDetails";
import TreatmentDetails from "./pages/TreatmentDetails";
import PatientHospitalVisitsPage from "./pages/PatientHospitalVisitsPage"; 
import PatientAccountDetails from "./pages/PatientAccountDetails";
import DoctorAccount from "./pages/DoctorAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/patient-account/:id' element={<PatientAccountDetails />} />
        <Route path='/doctor-account/:id' element={<DoctorAccount />} />
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/hospital-visits' element={<HospitalVisits />} />
          <Route path='/hospital-visits/:id' element={<HospitalVisitDetails />} />
          <Route path='/receptionists' element={<Receptionist />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/patients/:id' element={<PatientDetails />} />
          <Route path='/patients/:id/hospital-visits' element={<PatientHospitalVisitsPage />} />
          <Route path='/treatment-records/:id' element={<TreatmentDetails />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:id' element={<DoctorDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
