/* eslint-disable react/prop-types */
import { useState } from "react";
import { createAnimal } from "../../API/animal";
import "./CreateAnimal.css";
import IconSend from "../../assets/icons/IconSend";

const CreateAnimal = ({ getAllAnimals, customers }) => {
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    color: "",
    dateOfBirth: "",
    customer: {
      id: "",
    },
  });
  const [createErrorMessage, setCreateErrorMessage] = useState("");

  const handleNewAnimal = (event) => {
    const { name, value } = event.target;
    if (name === "customer") {
      setNewAnimal({ ...newAnimal, customer: { id: value } });
    } else {
      setNewAnimal({ ...newAnimal, [name]: value });
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    createAnimal(newAnimal)
      .then(() => getAllAnimals())
      .catch((err) => setCreateErrorMessage(err.response.data.message));
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      color: "",
      dateOfBirth: "",
      customer: {
        id: "",
      },
    });
  };

  return (
    <div>
      <h2>Hayvan Ekle</h2>
      <div className="animal-inputs">
        <form action="">
          <input
            type="text"
            name="name"
            value={newAnimal.name}
            placeholder="Hayvan Adı"
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            name="species"
            value={newAnimal.species}
            placeholder="Hayvan Türü"
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            name="breed"
            value={newAnimal.breed}
            placeholder="Hayvan Cinsi"
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            name="gender"
            value={newAnimal.gender}
            placeholder="Hayvan Cinsiyeti"
            onChange={handleNewAnimal}
          />
          <input
            type="text"
            name="color"
            value={newAnimal.color}
            placeholder="Hayvan Rengi"
            onChange={handleNewAnimal}
          />
          <input
            type="date"
            name="dateOfBirth"
            value={newAnimal.dateOfBirth}
            placeholder="Hayvan Doğum Tarihi"
            onChange={handleNewAnimal}
          />
          <select
            name="customer"
            onChange={handleNewAnimal}
            value={newAnimal.customer.id}
          >
            <option value="" disabled>
              Müşteriyi Seçiniz
            </option>
            {customers?.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <button onClick={handleCreate}>
            Ekle &nbsp; <IconSend />
          </button>
        </form>
        <div>{createErrorMessage}</div>
      </div>
    </div>
  );
};

export default CreateAnimal;
