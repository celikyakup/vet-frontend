/* eslint-disable react/prop-types */
import { useState } from "react";
import IconSend from "../../assets/icons/IconSend";
import { createReport } from "../../API/report";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";

const CreateReport = ({ appointments, getAllReports }) => {
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: 0,
    appointment: {
      id: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleNewReport = (e) => {
    const { name, value } = e.target;
    if (name === "appointment") {
      setNewReport({ ...newReport, appointment: { id: value } });
    } else {
      setNewReport({
        ...newReport,
        [name]: value,
      });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createReport(newReport)
      .then(() => {
        getAllReports();
        setNewReport({
          title: "",
          diagnosis: "",
          price: "",
          appointment: {
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
      <h2>Rapor Ekleme</h2>
      <div className="create-inputs">
        <form>
          <div>
            <input
              type="text"
              name="title"
              value={newReport.title}
              placeholder="Rapor Başlığı"
              onChange={handleNewReport}
            />
          </div>
          <div>
            <input
              type="text"
              name="diagnosis"
              value={newReport.diagnosis}
              placeholder="Rapor Tanısı"
              onChange={handleNewReport}
            />
          </div>
          <div>
            <input
              type="number"
              name="price"
              value={newReport.price}
              placeholder="Fiyat"
              onChange={handleNewReport}
            />
          </div>
          <div>
            <select
              name="appointment"
              onChange={handleNewReport}
              value={newReport.appointment.id || "null"}
            >
              <option value="null" disabled>
                Randevuyu Seçiniz
              </option>
              {appointments?.map((appointment) => (
                <option key={appointment.id} value={appointment.id}>
                  Tarih:{appointment.appointmentDate} Doktor:
                  {appointment.doctor.name.toUpperCase()} Hayvan:
                  {appointment.animal.name.toUpperCase()}
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

export default CreateReport;
