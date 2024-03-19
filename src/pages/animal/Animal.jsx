import {
  getAnimals,
  deleteAnimal,
  getAnimalByName,
  getAnimalByCustomerName,
} from "../../API/animal";
import CreateAnimal from "../../components/createAnimal/CreateAnimal";
import { useEffect, useState, useRef } from "react";
import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import UpdateAnimal from "../../components/updateAnimal/UpdateAnimal";
import { getCustomer } from "../../API/customer";

const Animal = () => {
  const [animals, setAnimals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [updateAnimal, setUpdateAnimal] = useState({
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
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (animal) => {
    setShow(true);
    setUpdateAnimal(animal);
  };

  useEffect(() => {
    getAllAnimals();
    getCustomer().then(setCustomers);
  }, []);

  const getAllAnimals = () => {
    getAnimals().then(setAnimals);
  };

  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteAnimal(id).then(() => getAllAnimals());
    }
  };

  const handleSearch = () => {
    if (inputRef.current.value) {
      getAnimalByName(inputRef.current.value).then(setAnimals);
      getAnimalByCustomerName(inputRef.current.value).then(setAnimals);
    } else {
      getAllAnimals();
    }
  };
  const handleSearchClear = (e) => {
    e.preventDefault();
    getAllAnimals();
    inputRef.current.value = "";
  };
  return (
    <div>
      <div>
        <h2>Hayvan Listeleme</h2>
        <input
          type="text"
          placeholder="Hayvan veya Müşteri ismi"
          name="search"
          ref={inputRef}
          className="search-input"
        />
        {!inputRef.current?.value ? (
          <button onClick={handleSearch} className="search-button">
            Ara
          </button>
        ) : (
          <button onClick={handleSearchClear} className="search-button">
            Temizle
          </button>
        )}

        <div className="get-list">
          <table>
            <tbody>
              <tr>
                <th>Adı</th>
                <th>Cinsi</th>
                <th>Türü</th>
                <th>Cinsiyeti</th>
                <th>Rengi</th>
                <th>Doğum Yılı</th>
                <th>Müşteri Adı</th>
                <th>İşlemler</th>
              </tr>
              {animals.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.name}</td>
                  <td>{animal.species}</td>
                  <td>{animal.breed}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.color}</td>
                  <td>{animal.dateOfBirth}</td>
                  <td>{animal.customer.name}</td>
                  <td>
                    <IconDelete id={animal.id} onClick={handleDelete} />
                    <IconUpdate
                      id={animal.id}
                      onClick={() => handleShow(animal)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <UpdateAnimal
          customers={customers}
          updateAnimal={updateAnimal}
          setUpdateAnimal={setUpdateAnimal}
          getAllAnimals={getAllAnimals}
          handleClose={handleClose}
          show={show}
          setShow={setShow}
        />
      </div>
      <CreateAnimal getAllAnimals={getAllAnimals} customers={customers} />
    </div>
  );
};

export default Animal;
