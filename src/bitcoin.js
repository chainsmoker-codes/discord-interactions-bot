const fetch = require('node-fetch')
const cheerio = require('cheerio')

async function bitchcoin() {
    const response = await fetch(`https://coinmarketcap.com/currencies/bitcoin/`)
    const body = await response.text()
    const $ = cheerio.load(body)

    const price = $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > div > span').contents().first().text()

    const percent = $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > span').contents().get(1).data

    const arrow = $('#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > span').contents().get(0).attribs.class

    roles = ['1070278187407388763', '1011635113928429651', '1070448519082680372']
    another_roles = ['1070376219230601316', '1052981220469919774', '1070448519082680372']

    if(arrow == `icon-Caret-up`) {
        nick = `▲`
        roles.push(`1070308288404672612`)
        another_roles.push(`1070378999710236732`)
    } else {
        nick = `▼`
        roles.push(`1070308485058801724`)
        another_roles.push(`1070379081302032474`)
    }

    const a = await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.btc_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ BTC: ${price}`,
            roles: roles
        })
    })

    const b = await a.text()
    console.log(b)

    // const a = await fetch(`https://discord.com/api/guilds/${process.env.guild_id_2}/members/${process.env.btc_id}`, {
    //     method: "PATCH",
    //     headers: {
    //         "Authorization": `Bot ${process.env.TWS_TOKEN}`,
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         nick: `${nick} │ BTC: ${price}`,
    //         roles: another_roles
    //     })
    // })

}

module.exports = { bitchcoin }