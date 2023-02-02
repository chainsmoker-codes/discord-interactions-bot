const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { handler } = require('./../Utils/handler')

async function converter(one_role, two_role) {
    const response = await fetch('https://in.investing.com/currencies/usd-inr')
    const body = await response.text()
    const $ = cheerio.load(body)
    const price = $(".last-price-value.js-streamable-element").contents().first().text()
    const percentage = $("#js-main-container > section.main-container.container > div > header > div > div.last-price-and-wildcard > div.last-price > div.last.u-up > span.last-diff-percent > bdo > span").contents().first().text()

    dtc_roles = one_role
    another_roles = two_role

    dtc_roles.push(`1070274725189787682`)
    another_roles.push(`1070378118562451488`)

    var nick

    if (percentage[0] == `-`) {
        nick = `▼`
        dtc_roles.push(`1070308485058801724`)
        another_roles.push(`1070379081302032474`)
    } else {
        dtc_roles.push(`1070308288404672612`)
        another_roles.push(`1070378999710236732`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.usdinr_id, process.env.DTC_TOKEN, nick, price, dtc_roles, `$ ↔ ₹`)
    await handler(process.env.guild_id_2, process.env.usdinr_id, process.env.TWS_TOKEN, nick, price, another_roles, `$ ↔ ₹`)

}

module.exports = { converter }