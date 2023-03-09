const fs = require('fs');
const { country } = require('..');
// const country = 'Burkina Faso';
console.log(country, 'is the new country');
const path = `././addresses/${country}.json`;
fs.readFile(path, 'utf-8', async (err, data) => {
  if (err) throw err;
  const addressList = await JSON.parse(data);
  console.log(
    `${country} has total of ${addressList.length} addresses in the file`
  );
  // console.log(addressList[0].address.includes(country));
  const filteredData = await addressList.filter(
    (item) =>
      item.address &&
      item.address.includes(country) &&
      (item.address.match(/,/g) || []).length > 1
  );
  console.log(filteredData.length, 'addresses left after filtering.');

  fs.appendFileSync(path, JSON.stringify(filteredData));
});
