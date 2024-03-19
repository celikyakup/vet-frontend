/* eslint-disable react/prop-types */
import { useState } from "react";
import { createCustomer } from "../../API/customer";
import "./CreateCustomer.css";
import IconSend from "../../assets/icons/IconSend";

const CreateCustomer = ({ getAllCustomers }) => {
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const handleNewCustomer = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createCustomer(newCustomer).then(() => {
      getAllCustomers();
      setNewCustomer({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      });
    });
  };

  return (
    <div>
      <h2>Müşteri Ekleme</h2>
      <div className="create-inputs">
        <form>
          <div>
            <input
              type="text"
              name="name"
              value={newCustomer.name}
              placeholder="Müşteri Adı"
              onChange={handleNewCustomer}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={newCustomer.phone}
              placeholder="Telefon Numarası"
              onChange={handleNewCustomer}
            />
          </div>
          <div>
            <input
              type="email"
              name="mail"
              value={newCustomer.mail}
              placeholder="Mail"
              onChange={handleNewCustomer}
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={newCustomer.address}
              placeholder="Adres"
              onChange={handleNewCustomer}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={newCustomer.city}
              placeholder="Müşteri Şehri"
              onChange={handleNewCustomer}
            />
          </div>
          <button onClick={handleCreate}>
            Ekle &nbsp; <IconSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
