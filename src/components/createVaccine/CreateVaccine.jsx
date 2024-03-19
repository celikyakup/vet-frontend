/* eslint-disable react/prop-types */
import { useState } from "react";
import IconSend from "../../assets/icons/IconSend";
import { createVaccine } from "../../API/vaccine";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const CreateVaccine = ({ reports, getAllVaccines }) => {
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    report: {
      id: "",
    },
    animal: {
      id: "",
    },
  });
  const [reportId, setReportId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const handleNewVaccine = (e) => {
    const { name, value } = e.target;
    if (name === "animal") {
      setNewVaccine({ ...newVaccine, animal: { id: value } });
    } else if (name === "report") {
      setNewVaccine({ ...newVaccine, report: { id: value } });
      setReportId(value);
    } else {
      setNewVaccine({
        ...newVaccine,
        [name]: value,
      });
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createVaccine(newVaccine)
      .then(() => {
        getAllVaccines();
        setNewVaccine({
          name: "",
          code: "",
          protectionStartDate: "",
          protectionFinishDate: "",
          animal: {
            id: "",
          },
          report: {
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
      <h2>Aşı Ekleme</h2>
      <div className="create-inputs">
        <form>
          <div>
            <input
              type="text"
              name="code"
              value={newVaccine.code}
              onChange={handleNewVaccine}
              placeholder="Aşı Kodu"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={newVaccine.name}
              onChange={handleNewVaccine}
              placeholder="Aşı Adı"
            />
          </div>
          <div>
            <input
              type="date"
              name="protectionStartDate"
              value={newVaccine.protectionStartDate}
              onChange={handleNewVaccine}
            />
          </div>
          <div>
            <input
              type="date"
              name="protectionFinishDate"
              value={newVaccine.protectionFinishDate}
              onChange={handleNewVaccine}
            />
          </div>
          <div>
            <select
              name="report"
              onChange={handleNewVaccine}
              value={newVaccine.report.id}
            >
              <option value="" disabled>
                Raporu Seçiniz
              </option>
              {reports?.map((report) => (
                <option key={report.id} value={report.id}>
                  {report.title}{" "}
                  {report.appointment.appointmentDate.split("T")[0]}{" "}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="animal"
              onChange={handleNewVaccine}
              value={newVaccine.animal.id}
            >
              <option value="" disabled>
                Hayvanı Seçiniz
              </option>
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

export default CreateVaccine;
