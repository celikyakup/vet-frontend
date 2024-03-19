/* eslint-disable react/prop-types */
import { useState } from "react";
import { createDoctor } from "../../API/doctor";
import IconSend from "../../assets/icons/IconSend";

const CreateDoctor = ({ getAllDoctors }) => {
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  const handleNewDoctor = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createDoctor(newDoctor).then(() => {
      getAllDoctors();
      setNewDoctor({
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
      <h2>Doktor Ekleme</h2>
      <div className="create-inputs">
        <form>
          <div>
            <input
              type="text"
              name="name"
              value={newDoctor.name}
              placeholder="Doktor Adı"
              onChange={handleNewDoctor}
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={newDoctor.phone}
              placeholder="Telefon Numarası"
              onChange={handleNewDoctor}
            />
          </div>
          <div>
            <input
              type="email"
              name="mail"
              value={newDoctor.mail}
              placeholder="Mail"
              onChange={handleNewDoctor}
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={newDoctor.address}
              placeholder="Adres"
              onChange={handleNewDoctor}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              value={newDoctor.city}
              placeholder="Doktorun Şehri"
              onChange={handleNewDoctor}
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

export default CreateDoctor;
