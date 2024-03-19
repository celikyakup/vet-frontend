/* eslint-disable react/prop-types */
import { updateReportAPI } from "../../API/report";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const UpdateReport = ({
  updateReport,
  setUpdateReport,
  appointments,
  show,
  setShow,
  handleClose,
  getAllReports,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateReport = (event) => {
    const { name, value } = event.target;
    if (name === "appointment") {
      setUpdateReport({ ...updateReport, appointments: { id: value } });
    } else {
      setUpdateReport({ ...updateReport, [name]: value });
    }
  };

  const handleUpdate = () => {
    updateReportAPI(updateReport)
      .then(() => {
        getAllReports();
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
          <Modal.Title>Rapor Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-inputs">
            <form>
              <div>
                <input
                  type="text"
                  name="title"
                  value={updateReport.title}
                  placeholder="Rapor Başlığı"
                  onChange={handleUpdateReport}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="diagnosis"
                  value={updateReport.diagnosis}
                  placeholder="Rapor Tanısı"
                  onChange={handleUpdateReport}
                />
              </div>
              <div>
                <input
                  type="number"
                  name="price"
                  value={updateReport.price}
                  placeholder="Fiyat"
                  onChange={handleUpdateReport}
                />
              </div>
              <div>
                <select
                  name="appointment"
                  onChange={handleUpdateReport}
                  value={updateReport.appointment.id}
                >
                  {appointments?.map((appointment) => (
                    <option key={appointment.id} value={appointment.id}>
                      Tarih:{appointment.appointmentDate} Doktor:
                      {appointment.doctor.name.toUpperCase()} Hayvan:
                      {appointment.animal.name.toUpperCase()}
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

export default UpdateReport;
