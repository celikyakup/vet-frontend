import axios from "axios";

export const getAppointment = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/appointments"
  );
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/${id}`
  );
  return data;
};

export const createAppointment = async (appointments,date) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/${date}`,
    appointments
  );
  return data;
};

export const updateApoointmentAPI = async (appointments) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/${appointments.id}`,
    appointments
  );
  return data;
};

export const getAppointmentByDoctor = async (
  doctorName,
  startDate,
  endDate
) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/doctor?name=${
      doctorName
    }&start-date=${startDate}&end-date=${endDate}`
  );
  return data;
};


export const getAppointmentByAnimal = async (
  animalName,
  startDate,
  endDate
) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/animal?name=${
      animalName
    }&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

export const getAppointmentByDate = async (
  startDate,
  endDate
) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/date?&start-date=${startDate}&end-date=${endDate}`
  );
  return data;
};

export const getAppointmentByDoctorName = async (
  name
) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/doctor-name/${name}`
  );
  return data;
};

export const getAppointmentByAnimalName = async (
  name
) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/animal-name/${name}`
  );
  return data;
};