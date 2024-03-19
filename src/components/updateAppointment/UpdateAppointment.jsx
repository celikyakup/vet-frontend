/* eslint-disable react/prop-types */

import { updateApoointmentAPI } from "../../API/appointment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { useState } from "react";

const UpdateAppointment = ({
  setUpdateAppointment,
  updateAppointment,
  animals,
  doctors,
  handleClose,
  getAllAppointments,
  show,
  setShow,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleUpdateAppointment = (event) => {
    const { name, value } = event.target;
    if (name === "doctor") {
      setUpdateAppointment({ ...updateAppointment, doctor: { id: value } });
    } else if (name === "animal") {
      setUpdateAppointment({ ...updateAppointment, animal: { id: value } });
    } else {
      setUpdateAppointment({
        ...updateAppointment,
        [name]: value.split("T").join(" "),
      });
    }
  };
  const handleUpdate = () => {
    updateApoointmentAPI(updateAppointment)
      .then(() => {
        getAllAppointments();
        setShow(false);
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Randevu Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-inputs">
            <form>
              <div>
                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={updateAppointment.appointmentDate}
                  onChange={handleUpdateAppointment}
                />
              </div>
              <div>
                <select
                  name="doctor"
                  onChange={handleUpdateAppointment}
                  value={updateAppointment.doctor.id}
                >
                  {doctors?.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="animal"
                  onChange={handleUpdateAppointment}
                  value={updateAppointment.animal.id}
                >
                  {animals?.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </Modal.Body>
        {errorMessage && (
          <Alert severity="error" className="err-msg">
            <AlertTitle className="err-msg-item">Warning</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button onClick={handleUpdate} className="add-btn">
            Ekle
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateAppointment;
