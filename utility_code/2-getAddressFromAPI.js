const fs = require('fs');
const country = 'Afghanistan';
const path = `././addresses/${country}.json`;

fs.readFile(path, 'utf-8', (err, data) => {
  if (err) throw err;
  const addressList = JSON.parse(data);
  console.log(addressList.length);
  // console.log(addressList[0].address.includes(country));
  const filteredData = addressList.filter((item) => {
    return item.address !== null && item.address.includes(country);
  });
  console.log(filteredData.length);

  fs.appendFileSync(path, JSON.stringify(filteredData));
});
