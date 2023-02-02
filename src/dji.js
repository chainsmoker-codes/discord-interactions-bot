const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function dji(dtc_roles) {
    const response = await fetch(`https://www.marketwatch.com/investing/index/djia`)
    const body = await response.text()
    const $ = cheerio.load(body)
    const price = $('#maincontent > div.region.region--intraday > div.column.column--aside > div > div.intraday__data > h2 > span').contents().first().text()
    const percent = $('#maincontent > div.region.region--intraday > div.column.column--aside > div > div.intraday__data > bg-quote > span.change--percent--q').contents().first().text()

    dtc_roles.push(`1070456854024564768`)

    if(percent[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.dji_id, process.env.DTC_TOKEN, nick, price, dtc_roles, `DJI`)
}

module.exports = { dji }