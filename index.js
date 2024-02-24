const ax = require('axios');
const fs = require('fs');

const asseturl = 'https://api.xeggex.com/api/v2/asset/getlist';


let fetchAsset = async () => {

    let response = await ax.get(asseturl)
    let data = await response.data
    fs.writeFileSync('asset.json', JSON.stringify(data, null, 2));

}

fetchAsset();
