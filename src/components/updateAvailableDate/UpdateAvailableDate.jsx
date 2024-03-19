/* eslint-disable react/prop-types */
import { updateDateAPI } from "../../API/availableDate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UpdateAvailableDate = ({
  updateAvailableDate,
  setUpdateAvailableDate,
  getAvailableDates,
  setShow,
  show,
  handleClose,
  doctors,
}) => {
  const handleUpdateAvaiableDate = (event) => {
    const { name, value } = event.target;
    if (name === "doctor") {
      setUpdateAvailableDate({ ...updateAvailableDate, doctor: { id: value } });
    } else {
      setUpdateAvailableDate({ ...updateAvailableDate, [name]: value });
    }
  };

  const handleUpdate = () => {
    updateDateAPI(updateAvailableDate).then(() => getAvailableDates());
    setShow(false);
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
                  type="date"
                  name="availableDate"
                  value={updateAvailableDate.availableDate}
                  onChange={handleUpdateAvaiableDate}
                />
              </div>
              <div>
                <select
                  name="doctor"
                  onChange={handleUpdateAvaiableDate}
                  value={updateAvailableDate.doctor.id}
                >
                  {!!doctors &&
                    doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                </select>
              </div>
            </form>
          </div>
        </Modal.Body>
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

export default UpdateAvailableDate;
