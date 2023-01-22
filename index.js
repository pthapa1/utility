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
const country = 'Angola';
const cities = ['Luanda', 'Huambo', 'Lobito', 'Benguela', 'Kuito'];
// const city = cities[1];
const filePath = `./addresses/${country}.json`;
// required by replace-in-file
const options = {
  files: `./addresses/${country}.json`,
  from: /\]\s*\[/gm,
  to: ',',
  allowEmptyPaths: false,
};
async function writeAddressToFile(path, dataToWrite, addressType, city) {
  fs.appendFile(path, dataToWrite, (err) => {
    if (err) throw err;
    console.log(
      `${addressType} Addresses Saved in ${country}.json file for ${city}`
    );
    // if this pattern -> ][ exists, replace it with a comma (,)
    fs.existsSync(path)
      ? replace.sync(options)
      : console.log(`File does not exits yet`);
  });
}

async function getAddress(config, addressType, city) {
  try {
    const response = await axios(config);
    const strRes = JSON.stringify(response.data);
    await writeAddressToFile(filePath, strRes, addressType, city);
  } catch (error) {
    console.log(`Error in getCityAddress: ${error}`);
  }
}

async function loopOnAddressType(city) {
  for (const addressType of addressTypes) {
    console.log(`Searching ${addressType} in ${city}, ${country} `);
    const config = {
      method: 'get',
      url: `http://localhost:3000/address/${addressType}/${city}`,
      headers: {},
    };
    await getAddress(config, addressType, city);
  }
}

(async () => {
  for (const city of cities) {
    await loopOnAddressType(city);
  }
})();
