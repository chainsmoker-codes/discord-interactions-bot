const { NseIndia } = require('stock-nse-india')
const fetch = require('node-fetch')
const cheerio = require('cheerio')

const nse = new NseIndia()

async function nifty() {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[0]
    var nick

    var another_roles = ['1070376219230601316', '1052981220469919774', '1070377248013701162']

    if(reqdata.percentChange.toString()[0] == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070272067662008393', '1070308288404672612']
        nick = `▲`
        another_roles.push(`1070378999710236732`)
    } else if (reqdata.percentChange.toString()[0] == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070272067662008393', '1070308485058801724']
        another_roles.push(`1070379081302032474`)
    } else {
        nick = ''
    }

    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.nifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ N50: ${reqdata.last}`,
            roles: roles
        })
    })

    const a = await fetch(`https://discord.com/api/guilds/${process.env.guild_id_2}/members/${process.env.nifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.TWS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ N50: ${reqdata.last}`,
            roles: another_roles
        })
    })

    const b = await a.text()
    console.log(b + `nifty`)
}

async function niftybank() {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[18]
    var nick

    another_roles = ['1070376219230601316', '1052981220469919774', '1070377530659438624']

    console.log(reqdata.percentChange)

    if(reqdata.percentChange.toString()[0] == `+`) {
        roles = ['1070278187407388763', '1011635113928429651', '1070273427954475020', '1070308288404672612']
        another_roles.push(`1070378999710236732`)
        nick = `▲`
        console.log(nick)
    } else if (reqdata.percentChange.toString()[0] == `-`) {
        nick = `▼`
        roles = ['1070278187407388763', '1011635113928429651', '1070273427954475020', '1070308485058801724']
        another_roles.push(`1070379081302032474`)
        console.log(nick)
    } else {
        nick = ``
    }

    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.banknifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ BNF: ${reqdata.last}`,
            roles: roles
        })
    })

    const a = await fetch(`https://discord.com/api/guilds/${process.env.guild_id_2}/members/${process.env.banknifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.TWS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ BNF: ${reqdata.last}`,
            roles: another_roles
        })
    })

    const b = await a.text()
    console.log(b + `bank`)
}

async function sgx() {
    const response = await fetch('https://sgxnifty.org/')
    const body = await response.text()
    const $ = cheerio.load(body)
    const value = $("#indexes-div > div:nth-child(1) > div:nth-child(3) > table > tbody > tr > td:nth-child(1)").text().trim()
    const percentage = $("#indexes-div > div:nth-child(1) > div:nth-child(3) > table > tbody > tr > td:nth-child(3)").contents().first().text()
    if(percentage[0] == `+`) {
        another_roles = ['1070376219230601316', '1052981220469919774', '1070377821643477105', '1070378999710236732']
        roles = ['1070278187407388763', '1011635113928429651', '1070274133662892076', '1070308288404672612']
        nick = `▲`
    } else if (percentage[0] == `-`) {
        nick = `▼`
        another_roles = ['1070376219230601316', '1052981220469919774', '1070377821643477105', '1070379081302032474']
        roles = ['1070278187407388763', '1011635113928429651', '1070274133662892076', '1070308485058801724']
    } else {
        nick = ``
    }
    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.sgxnifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ SGX: ${value}`,
            roles: roles
        })
    })
    await fetch(`https://discord.com/api/guilds/${process.env.guild_id_2}/members/${process.env.sgxnifty_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.TWS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ SGX: ${value}`,
            roles: another_roles
        })
    })
}

module.exports = { nifty, niftybank, sgx }