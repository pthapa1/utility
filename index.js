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
const country = 'Algeria';
const cities = ['Algiers', 'Oran', 'Constantine', 'Annaba', 'Batna'];
const city = cities[1];
const filePath = `./addresses/${country}.json`;
// required by replace-in-file
const options = {
  files: `./addresses/${country}.json`,
  from: /\]\s*\[/gm,
  to: ',',
  allowEmptyPaths: false,
};
const writeAddressToFile = async (path, dataToWrite) => {
  fs.appendFile(path, dataToWrite, (err) => {
    if (err) throw err;
    console.log(`Addresses Saved in ${country}.json file`);
    // if this pattern -> ][ exists, replace it with a comma (,)
    fs.existsSync(path)
      ? replace.sync(options)
      : console.log(`File does not exits yet`);
  });
};

const getCityAddresses = async (config) => {
  try {
    const response = await axios(config);
    const strRes = JSON.stringify(response.data);
    await writeAddressToFile(filePath, strRes);
  } catch (error) {
    console.log(`Error in getCityAddress: ${error}`);
  }
};
(async () => {
  for (const addressType of addressTypes) {
    console.log(`Searching ${addressType} in ${city}, ${country} `);
    const config = {
      method: 'get',
      url: `http://localhost:3000/address/${addressType}/${city}`,
      headers: {},
    };
    await getCityAddresses(config);
  }
})();

// now loop over cities too and get the addresses.
