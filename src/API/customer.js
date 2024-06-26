import axios from "axios";

export const getCustomer = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/customers"
  );
  return data;
};

export const getCustomerByName = async (name) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/customers/name/${name}`
  );
  return data;
};

export const deleteCustomer = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/customers/${id}`
  );
  return data;
};

export const createCustomer = async (customer) => {
  const { data } = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "/v1/customers",
    customer
  );
  return data;
};

export const updateCustomerAPI = async (customer) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/customers/${customer.id}`,
    customer
  );
  return data;
};
