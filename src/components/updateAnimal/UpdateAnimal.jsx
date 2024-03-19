/* eslint-disable react/prop-types */

import { updateAnimalAPI } from "../../API/animal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./UpdateAnimal.css";

const UpdateAnimal = ({
  customers,
  updateAnimal,
  setUpdateAnimal,
  getAllAnimals,
  handleClose,
  show,
  setShow,
}) => {
  const handleUpdateAnimal = (event) => {
    const { name, value } = event.target;
    if (name === "customer") {
      setUpdateAnimal({ ...updateAnimal, customer: { id: value } });
    } else {
      setUpdateAnimal({ ...updateAnimal, [name]: value });
    }
  };

  const handleUpdate = () => {
    updateAnimalAPI(updateAnimal).then(() => getAllAnimals());
    setShow(false);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hayvan Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-inputs animals">
            <input
              type="text"
              name="name"
              value={updateAnimal.name}
              placeholder="Hayvan Adı"
              onChange={handleUpdateAnimal}
            />
            <input
              type="text"
              name="species"
              value={updateAnimal.species}
              placeholder="Hayvan Türü"
              onChange={handleUpdateAnimal}
            />
            <input
              type="text"
              name="breed"
              value={updateAnimal.breed}
              placeholder="Hayvan Cinsi"
              onChange={handleUpdateAnimal}
            />
            <input
              type="text"
              name="gender"
              value={updateAnimal.gender}
              placeholder="Hayvan Cinsiyeti"
              onChange={handleUpdateAnimal}
            />
            <input
              type="text"
              name="color"
              value={updateAnimal.color}
              placeholder="Hayvan Rengi"
              onChange={handleUpdateAnimal}
            />
            <input
              type="date"
              name="dateOfBirth"
              value={updateAnimal.dateOfBirth}
              placeholder="Hayvan Doğum Tarihi"
              onChange={handleUpdateAnimal}
            />
            <select
              name="customer"
              onChange={handleUpdateAnimal}
              value={updateAnimal.customer.id}
              className="animal-select"
            >
              {!!customers &&
                customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
            </select>
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

export default UpdateAnimal;
