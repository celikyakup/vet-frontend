import { useEffect, useState } from "react";
import { deleteVaccine, getVaccine } from "../../API/vaccine";
import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import { getReport } from "../../API/report";
import CreateVaccine from "../../components/createVaccine/CreateVaccine";
import UpdateVaccine from "../../components/updateVaccine/UpdateVaccine";

const Vaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [reports, setReports] = useState([]);
  const [updateVaccine, setUpdateVaccine] = useState({
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (vaccine) => {
    setShow(true);
    setUpdateVaccine(vaccine);
  };

  useEffect(() => {
    getAllVaccines();
    getReport().then(setReports);
  }, []);
  const getAllVaccines = () => {
    getVaccine().then(setVaccines);
  };
  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteVaccine(id).then(() => getAllVaccines());
    }
  };
  return (
    <div>
      <h2>Aşı Listesi</h2>
      <div className="get-list">
        <table>
          <tbody>
            <tr>
              <th>Aşı Kodu</th>
              <th>Aşı Adı</th>
              <th>Koruyuculuk Başlangıç Tarihi</th>
              <th>Koruyuculuk Bitiş Tarihi</th>
              <th>Hayvan İsmi</th>
              <th>Hayvan Cinsi</th>
              <th>Müşteri Adı</th>
              <th>Rapor Bilgisi</th>
              <th>İşlemler</th>
            </tr>
            {vaccines.map((vaccine) => (
              <tr key={vaccine.id}>
                <td>{vaccine.code}</td>
                <td>{vaccine.name}</td>
                <td>{vaccine.protectionStartDate}</td>
                <td>{vaccine.protectionFinishDate}</td>
                <td>{vaccine.animal.name}</td>
                <td>{vaccine.animal.species}</td>
                <td>{vaccine.animal.customer.name}</td>
                <td>{vaccine.report.title}</td>
                <td>
                  <IconDelete id={vaccine.id} onClick={handleDelete} />
                  <IconUpdate
                    id={vaccine.id}
                    onClick={() => handleShow(vaccine)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateVaccine
        show={show}
        setShow={setShow}
        getAllVaccines={getAllVaccines}
        updateVaccine={updateVaccine}
        setUpdateVaccine={setUpdateVaccine}
        reports={reports}
        handleClose={handleClose}
      />
      <CreateVaccine reports={reports} getAllVaccines={getAllVaccines} />
    </div>
  );
};

export default Vaccine;
