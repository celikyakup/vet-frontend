import { useState, useEffect, useRef } from "react";
import CreateDoctor from "../../components/createDoctor/CreateDoctor";
import { getDoctor, deleteDoctor, getDoctorByName } from "../../API/doctor";
import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import UpdateDoctor from "../../components/updateDoctor/UpdateDoctor";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    getAllDoctors();
  }, []);
  const getAllDoctors = () => getDoctor().then(setDoctors);

  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteDoctor(id).then(() => {
        getAllDoctors();
      });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (doctor) => {
    setShow(true);
    setUpdateDoctor(doctor);
  };

  const handleSearch = () => {
    getDoctorByName(inputRef.current.value).then(setDoctors);
  };

  const handleSearchClear = () => {
    inputRef.current.value = "";
    getAllDoctors();
  };

  return (
    <div>
      <h2>Doktor Listeleme</h2>
      <input
          type="text"
          placeholder="Doktor ismi"
          name="search"
          ref={inputRef}
          className="search-input"
        />
        {!inputRef.current?.value ? (
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
        ) : (
          <button onClick={handleSearchClear} className="search-button">
            Temizle
          </button>
        )}
      <div className="get-list">
        <table>
          <tbody>
            <tr>
              <th>Adı</th>
              <th>Telefon Numarası</th>
              <th>Mail</th>
              <th>Adres</th>
              <th>Şehir</th>
              <th>İşlemler</th>
            </tr>

            {doctors?.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.mail}</td>
                <td>{doctor.address}</td>
                <td>{doctor.city}</td>
                <td>
                  <IconDelete id={doctor.id} onClick={handleDelete} />
                  <IconUpdate
                    id={doctor.id}
                    onClick={() => handleShow(doctor)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateDoctor
        updateDoctor={updateDoctor}
        setUpdateDoctor={setUpdateDoctor}
        getAllDoctors={getAllDoctors}
        handleClose={handleClose}
        show={show}
        setShow={setShow}
      />
      <CreateDoctor getAllDoctors={getAllDoctors} />
    </div>
  );
};

export default Doctor;
