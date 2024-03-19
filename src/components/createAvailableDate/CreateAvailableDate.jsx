/* eslint-disable react/prop-types */
import { useState } from "react";
import { createDate } from "../../API/availableDate";
import IconSend from "../../assets/icons/IconSend";

const CreateAvailableDate = ({ getAvailableDates, doctors }) => {
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: {
      id: "",
    },
  });

  const handleNewDate = (e) => {
    const { name, value } = e.target;
    if (name === "doctor") {
      setNewAvailableDate({ ...newAvailableDate, doctor: { id: value } });
    } else {
      setNewAvailableDate({ ...newAvailableDate, [name]: value });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createDate(newAvailableDate).then(() => {
      getAvailableDates();
      setNewAvailableDate({
        availableDate: "",
        doctor: {
          id: "",
        },
      });
    });
  };
  return (
    <div>
      <h2>Müsait Gün Ekleme</h2>
      <div className="create-inputs">
        <form>
          <div>
            <input
              type="date"
              name="availableDate"
              value={newAvailableDate.availableDate}
              onChange={handleNewDate}
            />
          </div>
          <div>
            <select
              name="doctor"
              onChange={handleNewDate}
              value={newAvailableDate.doctor.id}
            >
              <option value="" disabled>
                Doktoru Seçiniz
              </option>
              {!!doctors &&
                doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
            </select>
          </div>

          <button onClick={handleCreate}>
            Ekle &nbsp; <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAvailableDate;
