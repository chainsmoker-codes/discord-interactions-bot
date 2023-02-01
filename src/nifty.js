const { NseIndia } = require('stock-nse-india')
const fetch = require('node-fetch')

const nse = new NseIndia()

async function nifty() {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[0]

    if(reqdata.percentChange[0].toString() == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070274725189787682', '1070308288404672612']
        nick = `▲`
    } else if (reqdata.percentChange[0].toString() == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070274725189787682', '1070308485058801724']
    }

    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.nifty_id}`, {
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
}