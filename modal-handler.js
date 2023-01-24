async function modal_handler(interaction, req) {
    const time = new Date().toISOString()
    var desc = interaction.data.components[2].components[0].value
    var regex = /\n/g
    desc = desc.replace(regex, "\n+")
    var other = interaction.data.components[3].components[0].value ? interaction.data.components[3].components[0].value : "none"
    other = other.replace(regex, "\n-")

    await fetch(`https://discord.com/api/channels/${process.env.log_channel}/messages`, {
		method: "POST",
		headers: {
			"Authorization": `Bot ${process.env.token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			content: `<@&${process.env.admin_role_id}>`,
			embeds: [
				{
					description: `**New Submission From <@${interaction.member.user.id}>**`,
					color: 3092790,
					fields: [
						{
							name: `Submitted At ⌚ :`,
							value: `> **<t:${req.headers['x-signature-timestamp']}:F> : <t:${req.headers['x-signature-timestamp']} :R>**`
						},
						{
							name: "Demo Repo Link <:github:1061581043100028981> :",
							value: `> ** ${interaction.data.components[0].components[0].value} **`
						},
						{
							name: "Demo Cyclic Link <:cyclic:1061582002760978482> :",
							value: `> ** ${interaction.data.components[1].components[0].value} **`
						},
						{
							name: "App/Site Description 📝 :",
							value: `>>> ***\`\`\`diff\n+${desc}\`\`\`***`
						},
						{
							name: "Any Other Comments/Questions ❓:",
							value: `>>> ***\`\`\`diff\n+${other}\`\`\`***`
						}
					],
					footer: {
						text: "Cyclic.sh",
						icon_url: "https://media.discordapp.net/attachments/824845539353821234/106155433797066348488918e89be601efa9d38523c23074414.png"
					},
					timestamp: time		
				}
			]
		})
	})
}

module.exports = { modal_handler }