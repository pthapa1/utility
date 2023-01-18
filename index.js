const axios = require('axios');
const fs = require('fs');
const replace = require('replace-in-file');
// to use it with address search. AddressType is required for the API.
const addressTypes = [
  'hotels',
  'restaurants',
  'shopping centers',
  'things to do',
];

const addressType = addressTypes[0]; // 0 - 3
const country = 'Albania';
const cities = ['Tirana', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan'];
const city = cities[3]; // 0 - 4 . Max of index 4

console.log(`Searching ${addressType} in ${city}, ${country} `);

// used to replace ][ with a comma (,)
const options = {
  files: `./addresses/${country}.json`,
  from: /\]\s*\[/gm,
  to: ',',
  allowEmptyPaths: false,
};

const config = {
  method: 'get',
  url: `http://localhost:3000/address/${addressType}/${city}`,
  headers: {},
};

(async () => {
  try {
    const response = await axios(config);
    const strRes = JSON.stringify(response.data);
    // console.log(strRes);
    fs.appendFile(`./addresses/${country}.json`, strRes, (err) => {
      if (err) {
        throw new err();
      }
      console.log('file created successfully.');
    });

    fs.existsSync(`./addresses/${country}.json`)
      ? replace.sync(options)
      : console.log(`File does not exits yet`);
  } catch (error) {
    console.error(error);
  }
})();

// fs.readFile('./sample-country.json', 'utf-8', async (err, data) => {
//   if (err) throw err;
//   const fileData = await JSON.parse(data); // entire list.
// });

// const config = {
//   method: 'get',
//   url: 'http://localhost:3000/address/Roseau Dominica',
//   headers: {},
// };

// axios(config)
//   .then((response) => {
//     const resFromAPI = JSON.stringify(response.data);
//     // console.log(JSON.stringify(resFromAPI));

//     fs.writeFile('Dominica.json', resFromAPI, (err) => {
//       if (err) {
//         throw new err();
//       }
//       console.log('file created successfully.');
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
