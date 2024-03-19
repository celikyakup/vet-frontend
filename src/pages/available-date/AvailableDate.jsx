import { useEffect, useRef, useState } from "react";
import {
  deleteDate,
  getDate,
  getDateByDoctor,
  getDateFilterDate,
} from "../../API/availableDate";

import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import CreateAvailableDate from "../../components/createAvailableDate/CreateAvailableDate";
import UpdateAvailableDate from "../../components/updateAvailableDate/UpdateAvailableDate";
import { getDoctor } from "../../API/doctor";

const AvailableDate = () => {
  const [availableDate, setAvailableDate] = useState([]);
  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    doctor: {
      id: "",
    },
    availableDate: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [show, setShow] = useState(false);
  const inputDoctorNameRef = useRef(null);
  const inpoutStartDateRef = useRef(null);
  const inputEndDateRef = useRef(null);

  useEffect(() => {
    getAvaiableDates();
    getDoctor().then(setDoctors);
  }, []);
  const getAvaiableDates = () => {
    getDate().then(setAvailableDate);
  };
  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteDate(id).then(() => {
        getAvaiableDates();
      });
    }
  };
  const handleClose = () => setShow(false);

  const handleShow = (availableDate) => {
    setShow(true);
    setUpdateAvailableDate(availableDate);
  };

  const handleSearch = () => {
    if (inputDoctorNameRef.current.value) {
      getDateByDoctor(
        inputDoctorNameRef.current.value,
        inpoutStartDateRef.current.value,
        inputEndDateRef.current.value
      ).then(setAvailableDate);
    } else {
      getDateFilterDate(
        inpoutStartDateRef.current.value,
        inputEndDateRef.current.value
      ).then(setAvailableDate);
    }
  };

  const handleSearchClear = (e) => {
    e.preventDefault();
    getAvaiableDates();
    inputDoctorNameRef.current.value = "";
    inpoutStartDateRef.current.value = "";
    inputEndDateRef.current.value = "";
  };

  return (
    <div>
      <div>
        <h2>Doktor Müsait Gün Listeleme</h2>
        <input
          type="text"
          placeholder="Doktor Adı"
          className="search-input"
          ref={inputDoctorNameRef}
        />
        <input
          type="date"
          placeholder="Başlangıç Tarihi"
          className="search-input"
          ref={inpoutStartDateRef}
          min="1000-01-01"
          max="9999-12-31"
        />
        <input
          type="date"
          placeholder="Bitiş Tarihi"
          className="search-input"
          ref={inputEndDateRef}
          min="1000-01-01"
          max="9999-12-31"
        />
        {!inpoutStartDateRef.current?.value ? (
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
                <th>Doktor Adı</th>
                <th>Doktor Müsait GÜn</th>
                <th>İşlemler</th>
              </tr>

              {availableDate.map((date) => (
                <tr key={date.id}>
                  <td>{date.doctor.name}</td>
                  <td>{date.availableDate}</td>
                  <td>
                    <IconDelete id={date.id} onClick={handleDelete} />
                    <IconUpdate id={date.id} onClick={() => handleShow(date)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateAvailableDate
        doctors={doctors}
        updateAvailableDate={updateAvailableDate}
        setUpdateAvailableDate={setUpdateAvailableDate}
        getAvailableDates={getAvaiableDates}
        handleClose={handleClose}
        show={show}
        setShow={setShow}
      />
      <CreateAvailableDate
        getAvailableDates={getAvaiableDates}
        doctors={doctors}
      />
    </div>
  );
};

export default AvailableDate;
