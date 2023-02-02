const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { handler } = require('./../Utils/handler')

async function bitchcoin(one_role) {
    const response = await fetch(`https://coinmarketcap.com/currencies/bitcoin/`)
    const body = await response.text()
    const $ = cheerio.load(body)

    dtc_roles = one_role

    dtc_roles.push(`1070448519082680372`)

    const price = $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > div > span').contents().first().text()

    const percent = $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > span').contents().get(1).data

    const arrow = $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > span').contents().get(0).attribs.class

    if(arrow == `icon-Caret-up`) {
        dtc_roles.push(`1070308288404672612`)
        nick = `▲`
    } else {
        dtc_roles.push(`1070308485058801724`)
        nick = `▼`
    }

    await handler(process.env.guild_id, process.env.btc_id, process.env.DTC_TOKEN, nick, price, dtc_roles, `BTC`)

}

module.exports = { bitchcoin }