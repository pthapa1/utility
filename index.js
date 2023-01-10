const axios = require('axios');
const fs = require('fs');

const config = {
  method: 'get',
  url: 'http://localhost:3000/address/Roseau Dominica',
  headers: {},
};

axios(config)
  .then((response) => {
    const resFromAPI = JSON.stringify(response.data);
    // console.log(JSON.stringify(resFromAPI));

    fs.writeFile('Dominica.json', resFromAPI, (err) => {
      if (err) {
        throw new err();
      }
      console.log('file created successfully.');
    });
  })
  .catch((error) => {
    console.log(error);
  });
