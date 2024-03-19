import { useState, useEffect, useRef } from "react";
import CreateAppointment from "../../components/createAppointment/CreateAppointment";
import {
  getAppointment,
  deleteAppointment,
  getAppointmentByDoctor,
  getAppointmentByAnimal,
  getAppointmentByDate,
  getAppointmentByDoctorName,
  getAppointmentByAnimalName,
} from "../../API/appointment";
import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import { getDoctor } from "../../API/doctor";
import { getAnimals } from "../../API/animal";
import UpdateAppointment from "../../components/updateAppointment/UpdateAppointment";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    doctor: {
      id: "",
    },
    animal: {
      id: "",
    },
  });
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const inputNameRef = useRef(null);
  const inputStartDateRef = useRef(null);
  const inputEndDateRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllAppointments();
    getDoctor().then((data) => setDoctors(data));
    getAnimals().then((data) => setAnimals(data));
  }, []);
  const getAllAppointments = () => {
    getAppointment().then(setAppointments);
  };
  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteAppointment(id).then(() => getAllAppointments());
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputNameRef.current.value && inputStartDateRef.current.value) {
      getAppointmentByDoctor(
        inputNameRef.current.value,
        inputStartDateRef.current.value,
        inputEndDateRef.current.value
      ).then(setAppointments);
      getAppointmentByAnimal(
        inputNameRef.current.value,
        inputStartDateRef.current.value,
        inputEndDateRef.current.value
      ).then(setAppointments);
    } else if (!inputNameRef.current.value && inputStartDateRef.current.value) {
      getAppointmentByDate(
        inputStartDateRef.current.value,
        inputEndDateRef.current.value
      ).then(setAppointments);
    } else if (inputNameRef.current.value && !inputStartDateRef.current.value) {
      getAppointmentByDoctorName(inputNameRef.current.value).then(
        setAppointments
      );
      getAppointmentByAnimalName(inputNameRef.current.value).then(
        setAppointments
      );
    }
  };

  const handleSearchClear = (e) => {
    e.preventDefault();
    getAllAppointments();
    inputNameRef.current.value = "";
    inputStartDateRef.current.value = "";
    inputEndDateRef.current.value = "";
  };

  const handleClose = () => setShow(false);
  const handleShow = (appointment) => {
    setShow(true);
    setUpdateAppointment(appointment);
  };

  return (
    <div>
      <div>
        <h2>Randevu Listesi</h2>
        <input
          type="text"
          placeholder="Hayvan veya Doktor ismi"
          name="search"
          ref={inputNameRef}
          className="search-input"
        />
        <input
          type="date"
          placeholder="Başlangıç Tarihi"
          name="search-startDate"
          min="1000-01-01"
          max="9999-12-31"
          ref={inputStartDateRef}
          className="search-input"
        />
        <input
          type="date"
          placeholder="Bitiş Tarihi"
          name="search-finishDate"
          min="1000-01-01"
          max="9999-12-31"
          ref={inputEndDateRef}
          className="search-input"
        />
        {!inputNameRef.current?.value && !inputStartDateRef.current?.value ? (
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
        ) : (
          <button className="search-button" onClick={handleSearchClear}>
            Temizle
          </button>
        )}
        <div className="get-list">
          <table>
            <tbody>
              <tr>
                <th>Randevu Tarihi</th>
                <th>Doktor Adı</th>
                <th>Hayvan Adı</th>
                <th>Müşteri Adı</th>
                <th>İşlemler</th>
              </tr>

              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.animal.name}</td>
                  <td>{appointment.animal.customer.name}</td>
                  <td>
                    <IconDelete id={appointment.id} onClick={handleDelete} />
                    <IconUpdate
                      id={appointment.id}
                      onClick={() => handleShow(appointment)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateAppointment
        updateAppointment={updateAppointment}
        setUpdateAppointment={setUpdateAppointment}
        animals={animals}
        doctors={doctors}
        handleClose={handleClose}
        getAllAppointments={getAllAppointments}
        show={show}
        setShow={setShow}
      />
      <CreateAppointment
        getAllAppointments={getAllAppointments}
        animals={animals}
        doctors={doctors}
      />
    </div>
  );
};

export default Appointment;
