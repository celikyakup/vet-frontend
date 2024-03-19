import "./App.css";
import { Route, Routes } from "react-router-dom";
import Animal from "./pages/animal/Animal";
import Customer from "./pages/customer/Customer";
import Doctor from "./pages/doctor/Doctor";
import Vaccine from "./pages/vaccine/Vaccine";
import Report from "./pages/report/Report";
import Appointment from "./pages/appointment/Appointment";
import Navbar from "./components/navbar/Navbar";
import AvailableDate from "./pages/available-date/AvailableDate";

function App() {
  return (
    <>
      <Navbar />
      <div className="default-page">
        <Routes>
          <Route path="/animal" element={<Animal />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/vaccine" element={<Vaccine />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/report" element={<Report />} />
          <Route path="/available-date" element={<AvailableDate />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
