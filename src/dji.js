async function dji() {
    const response = await fetch(`https://www.marketwatch.com/investing/index/djia`)
    const body = await response.text()
    const $ = cheerio.load(body)
    const data = $('#maincontent > div.region.region--intraday > div.column.column--aside > div > div.intraday__data > h2 > span').contents().first().text()
    const percent = $('#maincontent > div.region.region--intraday > div.column.column--aside > div > div.intraday__data > bg-quote > span.change--percent--q').contents().first().text()

    roles = ['1070278187407388763', '1011635113928429651', '1070456854024564768']

    if(percent[0] == `-`) {
        nick = `▼`
        roles.push(`1070308485058801724`)
    } else {
        nick = `▲`
        roles.push(`1070308288404672612`)
    }

    await fetch(`https://discord.com/api/guilds/${process.env.guild_id}/members/${process.env.dji_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${process.env.DTC_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ DJI: ${price}`,
            roles: roles
        })
    })
}

module.exports = { dji }