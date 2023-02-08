const yahoo = require('yahoo-finance')
const { handler } = require('./../Utils/handler')

async function dji(one_role) {

    const { price } = await yahoo.quote('%5EDJI')

    const value = price.regularMarketPrice
    const percent = price.regularMarketChangePercent.toString()

    dtc_roles = one_role

    dtc_roles.push(`1070456854024564768`)

    if(percent[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.dji_id, process.env.DTC_TOKEN, nick, value, dtc_roles, `DJI`)
}

module.exports = { dji }