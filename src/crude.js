const yahoo = require('yahoo-finance')
const { handler } = require('./../Utils/handler')

async function crude(new_roles) {
    const { price } = await yahoo.quore("CL=F")
    const percent = price.regularMarketChangePercent.toString()
    const value = price.regularMarketPrice

    dtc_roles = new_roles

    dtc_roles.push(`1070275232587325464`)

    if(percent[0] == `-`) {
        dtc_roles.push(`1070308485058801724`)
        nick = `▼`
    } else {
        dtc_roles.push(`1070308288404672612`)
        nick = `▲`
    }

    await handler(process.env.guild_id, process.env.crude_id, process.env.DTC_TOKEN, nick, value, dtc_roles, `OIL`)

}