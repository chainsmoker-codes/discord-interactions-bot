const fetch = require('node-fetch')
const { handler } = require('./../Utils/handler')

async function handler(guild_id, target_id, token, nick, price, roles, name) {
    const a = await fetch(`https://discord.com/api/guilds/${guild_id}/members/${target_id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bot ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: `${nick} │ ${name}: ${price}`,
            roles: roles
        })
    })

    const b = await a.text()
    console.log(b + ` ${name}`)
}

module.exports = { handler }