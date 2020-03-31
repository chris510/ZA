import axios from 'axios';

export const fetchProperties = () => {
  return axios({
    method: 'post',
    url: '/find',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      'type': "Feature",
      'geometry': {
      'type': "Point",
      'coordinates': [-80.0782213, 26.8849731]
      },
      'x-distance': 1755000
    }
  })
}

export const fetchPropertyImage = () => {
  return axios.get('/display/"f1650f2a99824f349643ad234abff6a2"?overlay=yes&building=green&parcel=orange');
}

export const fetchPropertyStatistics = () => {
  return axios.get('statistics/f853874999424ad2a5b6f37af6b56610?distance=1755000');
}