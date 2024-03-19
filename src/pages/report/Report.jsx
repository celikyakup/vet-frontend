import { useEffect, useState } from "react";
import { deleteReport, getReport } from "../../API/report";
import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import CreateReport from "../../components/createReport/CreateReport";
import { getAppointment } from "../../API/appointment";
import UpdateReport from "../../components/updateReport/UpdateReport";
const Report = () => {
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: 0,
    appointment: {
      id: "",
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (report) => {
    setShow(true);
    setUpdateReport(report);
  };

  useEffect(() => {
    getAllReports();
    getAppointment().then(setAppointments);
  }, []);

  const getAllReports = () => {
    getReport().then(setReports);
  };
  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteReport(id).then(() => getAllReports());
    }
  };
  return (
    <div>
      <div>
        <h2>Rapor Listesi</h2>

        <div className="get-list">
          <table>
            <tbody>
              <tr>
                <th>Rapor Başlığı</th>
                <th>Tehşis</th>
                <th>Fiyat</th>
                <th>Randevu Bilgisi</th>
                <th>Hayvan Bilgisi</th>
                <th>Doktor Bilgisi</th>
                <th>İşlemler</th>
              </tr>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.title}</td>
                  <td>{report.diagnosis}</td>
                  <td>{report.price} TL</td>
                  <td>
                    {report.appointment.appointmentDate.split("T").join(" ")}
                  </td>
                  <td>{report.appointment.animal.name}</td>
                  <td>{report.appointment.doctor.name}</td>
                  <td>
                    <IconDelete id={report.id} onClick={handleDelete} />
                    <IconUpdate
                      id={report.id}
                      onClick={() => handleShow(report)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateReport
        getAllReports={getAllReports}
        appointments={appointments}
        updateReport={updateReport}
        setUpdateReport={setUpdateReport}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
      />
      <CreateReport getAllReports={getAllReports} appointments={appointments} />
    </div>
  );
};

export default Report;
