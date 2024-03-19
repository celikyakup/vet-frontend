import axios from "axios";

export const getDate = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/dates"
  );
  return data;
};

export const deleteDate = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates/${id}`
  );
  return data;
};

export const createDate = async (dates) => {
  const { data } = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "/v1/dates",
    dates
  );
  return data;
};

export const updateDateAPI = async (dates) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates/${dates.id}`,
    dates
  );
  return data;
};

export const getDateByDoctor = async (doctorName, startDate, endDate) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates/doctor?start-date=${startDate}&end-date=${endDate}&name=${doctorName}`
  );
  return data;
};

export const getDateFilterDate = async (startDate, endDate) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/dates/date?start-date=${startDate}&end-date=${endDate}`
  );
  return data;
};
