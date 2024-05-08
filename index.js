

let sendMsg = function sendMessage(message,logourl){


    ax.post("https://discord.com/api/webhooks/1211067046557646918/DeL5-hT3u9I0NQrGip6_Q9wEObxNJ9Gpsk5EH1pvJ8CrIXWFk3CKrWS1IKAsH_yrQcNG", {
        content: message,
        avatar_url: logourl

        
    }).then(response => {
        console.log('Message sent:', message);
    }).catch(error => {
        console.error('Error:', error);
    });

} 

const ax = require('axios');
const fs = require('fs');

let currentAssets = require('./asset.json');


const asseturl = 'https://api.xeggex.com/api/v2/asset/getlist';

let fetchAsset = async () => {
    let response = await ax.get(asseturl);
    let data = await response.data;

    // Compare new data with current assets
    data.forEach(asset => {
        if (!currentAssets.find(a => a.id === asset.id)) {
            console.log('New asset found:', asset.name);

            // Send message to discord
            let newAssetAlert = `

            **[${asset.name} (${asset.ticker})](<https://xeggex.com/asset/${asset.ticker}>)** 

            ** GENERAL INFORMATION**
            -------------------------------
            
            **Name:** ${asset.name}
            **Website**: ${asset.website}
            **Ticker**: ${asset.ticker}
            **Network**: ${asset.network}
            **Is Active**: ${asset.isActive}
            **USD Value**: ${asset.usdValue}
            **Circulation**: ${asset.circulation}
            **Explorer**: <${asset.explorer}>

            ** SOCIAL INFORMATION**
            -------------------------------

            **Twitter**: <${asset.socialCommunity.Twitter}>
            **Github**: <${asset.socialCommunity.Github}>
            **Discord**: <${asset.socialCommunity.Discord}>
            **Telegram**: <${asset.socialCommunity.Telegram}>
            **Bitcointalk**: <${asset.socialCommunity.BitcoinTalk}>
            **Youtube**: <${asset.socialCommunity.YouTube}>

            ** TECHNICAL INFORMATION**
            -------------------------------

            **Liquidity Pool**: ${asset.canLiquidityPool}
            **Staking**: ${asset.canStake}
            **Voting**: ${asset.canVote}
            **NFTs**: ${asset.hasNfts}

            ** Contact Information**
            -------------------------------

            **Email**: ${asset.devEmail}
  
            `

            sendMsg(newAssetAlert,asset.logo);

        }
    });

    // Update current assets
    currentAssets = data;

    // Write to file
    fs.writeFileSync('asset.json', JSON.stringify(data, null, 2));
}

// Fetch asset every 5 seconds (or any interval you prefer)
setInterval(fetchAsset, 6000);
