import axios from 'axios';

// Fetch nearby properties based on initial lat, lng and surrounding radius
export const fetchProperties = (lat, lng, rad) => {
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
  return axios.get('/display/"f853874999424ad2a5b6f37af6b56610"?overlay=yes&building=green&parcel=orange', { responseType: 'arraybuffer' })
    .then((response) => {
      // Converts binary to base64
      const image = new Buffer(response.data, 'binary').toString('base64')
      return (`data:${response.headers['content-type'].toLowerCase()};base64,${image}`);
  });
}

export const fetchPropertyStatistics = () => {
  return axios.get('statistics/f853874999424ad2a5b6f37af6b56610?distance=1755000');
}

// TODO: CREATE bakcend method
export const saveProperty = () => {
  console.log('Property has been saved!');
}

// TODO: Ceate Backend methkd
export const removeProperty = () => {
  console.log('Property has been removed');
}

// 