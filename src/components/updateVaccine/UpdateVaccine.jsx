/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { updateVaccineAPI } from "../../API/vaccine";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const UpdateVaccine = ({
  show,
  setShow,
  updateVaccine,
  setUpdateVaccine,
  reports,
  handleClose,
  getAllVaccines,
}) => {
  const [reportId, setReportId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (updateVaccine.report.id) {
      setReportId(updateVaccine.report.id);
    }
  }, [updateVaccine]);

  const handleUpdateVaccine = (event) => {
    const { name, value } = event.target;
    if (name === "report") {
      setReportId(value);
      setUpdateVaccine({ ...updateVaccine, report: { id: value } });
    } else if (name === "animal") {
      setUpdateVaccine({ ...updateVaccine, animal: { id: value } });
    } else {
      setUpdateVaccine({ ...updateVaccine, [name]: value });
    }
  };

  const handleUpdate = () => {
    updateVaccineAPI(updateVaccine)
      .then(() => {
        getAllVaccines();
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
          <Modal.Title>Hayvan Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-inputs">
            <form>
              <div>
                <input
                  type="text"
                  name="code"
                  value={updateVaccine.code}
                  onChange={handleUpdateVaccine}
                  placeholder="Aşı Kodu"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  value={updateVaccine.name}
                  onChange={handleUpdateVaccine}
                  placeholder="Aşı Adı"
                />
              </div>
              <div>
                <input
                  type="date"
                  name="protectionStartDate"
                  value={updateVaccine.protectionStartDate}
                  onChange={handleUpdateVaccine}
                />
              </div>
              <div>
                <input
                  type="date"
                  name="protectionFinishDate"
                  value={updateVaccine.protectionFinishDate}
                  onChange={handleUpdateVaccine}
                />
              </div>
              <div>
                <select
                  name="report"
                  onChange={handleUpdateVaccine}
                  value={updateVaccine.report.id}
                >
                  {reports?.map((report) => (
                    <option key={report.id} value={report.id}>
                      {report.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  name="animal"
                  onChange={handleUpdateVaccine}
                  value={updateVaccine.animal.id}
                >
                  {reports?.map(
                    (report) =>
                      reportId == report.id && (
                        <option
                          key={report.appointment.animal.id}
                          value={report.appointment.animal.id}
                        >
                          {report.appointment.animal.name}
                        </option>
                      )
                  )}
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

export default UpdateVaccine;
