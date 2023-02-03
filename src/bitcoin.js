const yahoo = require('yahoo-finance')
const { handler } = require('./../Utils/handler')

async function bitchcoin(one_role) {

    const { price } = await yahoo.quote('BTC-INR')

    const value = price.regularMarketPrice
    const percent = results.price.regularMarketChangePercent.toString()

    dtc_roles = one_role

    dtc_roles.push(`1070448519082680372`)

    if(percent[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.btc_id, process.env.DTC_TOKEN, nick, value, dtc_roles, `BTC`)

}

module.exports = { bitchcoin }