/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateCustomerAPI } from "../../API/customer";

const UpdateCustomer = ({
  updateCustomer,
  setUpdateCustomer,
  show,
  setShow,
  getAllCustomers,
  handleClose,
}) => {
  const handleUpdateCustomer = (event) => {
    const { name, value } = event.target;

    setUpdateCustomer({ ...updateCustomer, [name]: value });
  };

  const handleUpdate = () => {
    updateCustomerAPI(updateCustomer).then(() => getAllCustomers());
    setShow(false);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Müşteri Güncelle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="create-inputs">
            <input
              type="text"
              name="name"
              value={updateCustomer.name}
              placeholder="Müşteri Adı"
              onChange={handleUpdateCustomer}
            />
            <input
              type="text"
              name="phone"
              value={updateCustomer.phone}
              placeholder="Müşteri Telefon"
              onChange={handleUpdateCustomer}
            />
            <input
              type="text"
              name="mail"
              value={updateCustomer.mail}
              placeholder="Müşteri Mail"
              onChange={handleUpdateCustomer}
            />
            <input
              type="text"
              name="address"
              value={updateCustomer.address}
              placeholder="Müşteri Adres"
              onChange={handleUpdateCustomer}
            />
            <input
              type="text"
              name="city"
              value={updateCustomer.city}
              placeholder="Müşteri Şehri"
              onChange={handleUpdateCustomer}
            />
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

export default UpdateCustomer;
