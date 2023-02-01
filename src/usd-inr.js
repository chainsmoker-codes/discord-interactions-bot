const cheerio = require('cheerio')
const fetch = require('node-fetch')

async function converter() {
    const response = await fetch('https://in.investing.com/currencies/usd-inr')
    const body = await response.text()
    const $ = cheerio.load(body)
    const price = $(".last-price-value.js-streamable-element").contents().first().text()
    const percentage = $("#js-main-container > section.main-container.container > div > header > div > div.last-price-and-wildcard > div.last-price > div.last.u-up > span.last-diff-percent > bdo > span").contents().first().text()

    let roles = []
    var nick

    if(percentage[0] == `+`) {
        another_roles = ['1070376219230601316', '1052981220469919774', '1070378118562451488', '1070378999710236732']
        roles = ['1070278187407388763', '1011635113928429651', '1070274725189787682', '1070308288404672612']
        nick = `▲`
    } else if (percentage[0] == `-`) {
        nick = `▼`
        another_roles = ['1070376219230601316', '1052981220469919774', '1070378118562451488', '1070379081302032474']
        roles = ['1070278187407388763', '1011635113928429651', '1070274725189787682', '1070308485058801724']
    }

    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.usdinr_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} $ ↦ ₹: ${price}`,
            roles: roles
        })
    })

    const a = await fetch(`https://discord.com/api/guilds/${process.env.guild_id_2}/members/${process.env.usdinr_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.TWS_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} $ ↦ ₹: ${price}`,
            roles: another_roles
        })
    })

    const b = await a.text()
    console.log(b)
}

module.exports = { converter }