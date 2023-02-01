const { NseIndia } = require('stock-nse-india')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const nse = new NseIndia()

async function nifty() {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[0]
    var nick

    if(reqdata.percentChange.toString()[0] == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070272067662008393', '1070308288404672612']
        nick = `▲`
    } else if (reqdata.percentChange.toString()[0] == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070272067662008393', '1070308485058801724']
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

async function niftybank() {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[18]
    var nick

    if(reqdata.percentChange.toString()[0] == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070273427954475020', '1070308288404672612']
        nick = `▲`
        console.log(nick)
    } else if (reqdata.percentChange.toString()[0] == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070273427954475020', '1070308485058801724']
        console.log(nick)
    }

    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.banknifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} NBANK: ${reqdata.last}`,
            roles: roles
        })
    })
}

async function sgx() {
    const response = await fetch('https://sgxnifty.org/')
    const body = await response.text()
    const $ = cheerio.load(body)
    const value = $("#indexes-div > div:nth-child(1) > div:nth-child(3) > table > tbody > tr > td:nth-child(1)").text().trim()
    const percentage = $("#indexes-div > div:nth-child(1) > div:nth-child(3) > table > tbody > tr > td:nth-child(3)").contents().first().text()
    if(percentage[0] == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070273626751897601', '1070308288404672612']
        nick = `▲`
    } else if (percentage[0] == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070273626751897601', '1070308485058801724']
    }
    const a = await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.sgxnifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} SGX: ${value}`,
            roles: roles
        })
    })
    const b = await a.text()
    console.log(b)
}

module.exports = { nifty, niftybank, sgx }