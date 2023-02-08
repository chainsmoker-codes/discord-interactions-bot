const { NseIndia } = require('stock-nse-india')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { handler } = require('./../Utils/handler')

const nse = new NseIndia()

async function nifty(one_role, two_role) {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[0]
    var nick
    
    dtc_roles = one_role
    another_roles = two_role

    dtc_roles.push(`1070272067662008393`)
    another_roles.push(`1070377248013701162`)

    if (reqdata.percentChange.toString()[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        another_roles.push(`1070379081302032474`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        another_roles.push(`1070378999710236732`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.nifty_id, process.env.DTC_TOKEN, nick, reqdata.last, dtc_roles, `N50`)
    await handler(process.env.guild_id_2, process.env.nifty_id, process.env.TWS_TOKEN, nick, reqdata.last, another_roles, `N50`)
    
}

async function niftybank(one_role, two_role) {
    const data = await nse.getDataByEndpoint("/api/allIndices")
    const reqdata = data.data[18]
    var nick

    dtc_roles = one_role
    another_roles = two_role

    dtc_roles.push(`1070273427954475020`)
    another_roles.push(`1070377530659438624`)

    if (reqdata.percentChange.toString()[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        another_roles.push(`1070379081302032474`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        another_roles.push(`1070378999710236732`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.banknifty_id, process.env.DTC_TOKEN, nick, reqdata.last, dtc_roles, `BNF`)
    await handler(process.env.guild_id_2, process.env.banknifty_id, process.env.TWS_TOKEN, nick, reqdata.last, another_roles, `BNF`)

}

async function sgx(one_role, two_role) {
    const response = await fetch('https://sgxnifty.org/')
    const body = await response.text()
    const $ = cheerio.load(body)
    const value = $("#indexes-div > div:nth-child(1) > div:nth-child(3) > table > tbody > tr > td:nth-child(1)").text().trim()
    const percentage = $("#indexes-div > div:nth-child(1) > div:nth-child(3) > table > tbody > tr > td:nth-child(3)").contents().first().text()

    dtc_roles = one_role
    another_roles = two_role

    dtc_roles.push(`1070274133662892076`)
    another_roles.push(`1070377821643477105`)

    if (percentage[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        another_roles.push(`1070379081302032474`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        another_roles.push(`1070378999710236732`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.sgxnifty_id, process.env.DTC_TOKEN, nick, value, dtc_roles, `SGX`)
    await handler(process.env.guild_id_2, process.env.sgxnifty_id, process.env.TWS_TOKEN, nick, value, another_roles, `SGX`)

}

module.exports = { nifty, niftybank, sgx }