import { useState } from "react";
import CreateCustomer from "../../components/createCustomer/CreateCustomer";
import { useRef, useEffect } from "react";
import {
  getCustomer,
  getCustomerByName,
  deleteCustomer,
} from "../../API/customer";
import IconDelete from "../../assets/icons/IconDelete";
import IconUpdate from "../../assets/icons/IconUpdate";
import UpdateCustomer from "../../components/updateCustomer/UpdateCustomer";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const inputRef = useRef(null);
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (customer) => {
    setShow(true);
    setUpdateCustomer(customer);
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = () => {
    getCustomer().then(setCustomers);
  };

  const handleSearch = () => {
    if (inputRef.current.value) {
      getCustomerByName(inputRef.current.value).then(setCustomers);
    }
  };
  const handleDelete = (event) => {
    const id = event.target.id;
    if (window.confirm("Are you  sure?")) {
      deleteCustomer(id).then(() => getAllCustomers());
    }
  };
  const handleSearchClear = (e) => {
    e.preventDefault();
    getAllCustomers();
    inputRef.current.value = "";
  };
  return (
    <div>
      <div className="customer-page">
        <h2>Müşteri Listesi</h2>
        <input
          type="text"
          placeholder="Müşteri Adını gir"
          className="search-input"
          ref={inputRef}
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
                <th>Telefon Numarası</th>
                <th>Mail</th>
                <th>Adres</th>
                <th>Şehir</th>
                <th>İşlemler</th>
              </tr>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.mail}</td>
                  <td>{customer.address}</td>
                  <td>{customer.city}</td>
                  <td>
                    <IconDelete id={customer.id} onClick={handleDelete} />
                    <IconUpdate
                      id={customer.id}
                      onClick={() => handleShow(customer)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <UpdateCustomer
          updateCustomer={updateCustomer}
          setUpdateCustomer={setUpdateCustomer}
          show={show}
          setShow={setShow}
          getAllCustomers={getAllCustomers}
          handleClose={handleClose}
        />
      </div>
      <CreateCustomer getAllCustomers={getAllCustomers} />
    </div>
  );
};

export default Customer;
