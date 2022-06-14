import Axios from 'axios';

export const GetAllApplicationsLogger = async () => {
  const result = await Axios.get(
    'https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f',
  )
    .then((data) => data)
    .catch((error) => error.response);
  return result;
};
