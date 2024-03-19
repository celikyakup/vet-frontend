import axios from "axios";

export const getVaccine = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/vaccines"
  );
  return data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/${id}`
  );
  return data;
};

export const createVaccine = async (vaccines) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines`,
    vaccines
  );
  return data;
};

export const updateVaccineAPI = async (vaccines) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/${vaccines.id}`,
    vaccines
  );
  return data;
};
