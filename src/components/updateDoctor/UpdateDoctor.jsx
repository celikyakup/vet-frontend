/* eslint-disable react/prop-types */
import { updateDoctorAPI } from "../../API/doctor";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UpdateDoctor = ({
  updateDoctor,
  setUpdateDoctor,
  getAllDoctors,
  handleClose,
  show,
  setShow,
}) => {
  const handleUpdateDoctor = (event) => {
    const { name, value } = event.target;

    setUpdateDoctor({ ...updateDoctor, [name]: value });
  };

  const handleUpdate = () => {
    updateDoctorAPI(updateDoctor).then(() => getAllDoctors());
    setShow(false);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Doktor Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-inputs">
            <form>
              <div>
                <input
                  type="text"
                  name="name"
                  value={updateDoctor.name}
                  placeholder="Doktor Adı"
                  onChange={handleUpdateDoctor}
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={updateDoctor.phone}
                  placeholder="Telefon Numarası"
                  onChange={handleUpdateDoctor}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="mail"
                  value={updateDoctor.mail}
                  placeholder="Mail"
                  onChange={handleUpdateDoctor}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  value={updateDoctor.address}
                  placeholder="Adres"
                  onChange={handleUpdateDoctor}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={updateDoctor.city}
                  placeholder="Doktorun Şehri"
                  onChange={handleUpdateDoctor}
                />
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
export default UpdateDoctor;
