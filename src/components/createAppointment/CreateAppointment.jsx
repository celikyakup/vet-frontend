/* eslint-disable react/prop-types */
import { useState } from "react";
import IconSend from "../../assets/icons/IconSend";
import { createAppointment } from "../../API/appointment";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const CreateAppointment = ({ getAllAppointments, animals, doctors }) => {
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: {
      id: "",
    },
    animal: {
      id: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleNewAppointment = (e) => {
    const { name, value } = e.target;
    if (name === "doctor") {
      setNewAppointment({ ...newAppointment, doctor: { id: value } });
    } else if (name === "animal") {
      setNewAppointment({ ...newAppointment, animal: { id: value } });
    }
    if (name === "appointmentDate") {
      setNewAppointment({
        ...newAppointment,
        [name]: value.split("T").join(" "),
      });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createAppointment(
      newAppointment,
      newAppointment.appointmentDate.split(" ", 1)
    )
      .then(() => {
        getAllAppointments();
        setNewAppointment({
          appointmentDate: "",
          doctor: {
            id: "",
          },
          animal: {
            id: "",
          },
        });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setTimeout(() => {
          setErrorMessage(errorMessage);
        }, 3000);
      });
  };

  return (
    <div>
      <h2>Randevu Ekleme</h2>
      <div className="create-inputs">
        <form>
          <div>
            <input
              type="datetime-local"
              name="appointmentDate"
              value={newAppointment.appointmentDate}
              onChange={handleNewAppointment}
            />
          </div>
          <div>
            <select
              name="doctor"
              onChange={handleNewAppointment}
              value={newAppointment.doctor.id || "null"}
            >
              <option value="null" disabled>
                Doktoru Seçiniz
              </option>
              {doctors?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>

            <select
              name="animal"
              onChange={handleNewAppointment}
              value={newAppointment.animal.id}
            >
              <option value="" disabled>
                Hayvanı Seçiniz
              </option>
              {animals?.map((animal) => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleCreate}>
            Ekle &nbsp; <IconSend />
          </button>
        </form>
        {errorMessage && (
          <Alert severity="error" className="err-msg">
            <AlertTitle className="err-msg-item">Warning</AlertTitle>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default CreateAppointment;
