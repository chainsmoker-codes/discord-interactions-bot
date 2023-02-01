const { NseIndia } = require('stock-nse-india')
const fetch = require('node-fetch')

const nse = new NseIndia()

async function nifty() {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[0]
    var nick

    if(reqdata.percentChange.toString()[0] == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070272067662008393', '1070308288404672612']
        nick = `▲`
        console.log(nick)
    } else if (reqdata.percentChange.toString()[0] == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070272067662008393', '1070308485058801724']
        console.log(nick)
    }

    const response = await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.nifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} N50: ${reqdata.last}`,
            roles: roles
        })
    })

    const dataa = await response.text()
    console.log(dataa)
}

module.exports = { nifty }