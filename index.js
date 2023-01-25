const express = require('express')
const fetch = require('node-fetch')
const { verifyKeyMiddleware } = require('discord-interactions')
const { update_roles } = require('./role-update')
const { modal_handler } = require('./modal-handler')

const app = express()

app.post('/interactions', verifyKeyMiddleware(process.env.public_key), async(req, res) => {

    const interaction = req.body
    const interaction_type = interaction.type

    if(interaction_type == 2) {
        const command_name = interaction.data.name

        if(command_name == `submit`) {
            await fetch(`https://discord.com/api/interactions/${interaction.id}/${interaction.token}/callback`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bot ${process.env.token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "type": 9,
                        "data": {
                            "title": "Office Hours Demo",
                              "custom_id": "cool_modal",
                              "components": [
                                {
                                    "type": 1,
                                    "components": [{
                                          "type": 4,
                                          "custom_id": "repo",
                                          "label": "Demo Github Repo",
                                          "style": 1,
                                          "min_length": 1,
                                          "max_length": 100,
                                          "placeholder": "Eg. https://github.com/user/repo_name",
                                         "required": true
                                       }]
                                  },
                                {
                                    "type": 1,
                                    "components": [{
                                          "type": 4,
                                          "custom_id": "cyclic_link",
                                          "label": "Demo Link",
                                          "style": 1,
                                          "min_length": 1,
                                          "max_length": 100,
                                          "placeholder": "For Eg: https://your-app-id.cyclic.app/",
                                         "required": true
                                       }]
                                  },
                                {
                                    "type": 1,
                                    "components": [{
                                        "type": 4,
                                        "custom_id": "site_desc",
                                        "label": "Demo Site Description",
                                        "style": 2,
                                        "min_length": 1,
                                        "max_length": 500,
                                        "placeholder": "Share a bit about your app/site.",
                                        "required": true
                                        }]
                                },
                                {
                                    "type": 1,
                                    "components": [{
                                        "type": 4,
                                        "custom_id": "other_ques",
                                        "label": "Other comments or questions?",
                                        "style": 2,
                                        "min_length": 1,
                                        "max_length": 500,
                                        "placeholder": "Feel Free to ask anything.",
                                        "required": false
                                        }]
                                }
                            ]
                        }
                    })
                })

            return res.sendStatus(200)
        }

    } else if(interaction_type == 5 || interaction_type == 3) {
        const custom_id = interaction.data.custom_id

        await fetch(`https://discord.com/api/interactions/${interaction.id}/${interaction.token}/callback`, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${process.env.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: 5,
                data: {
                    flags: 64
                }
            })
        })

        if (custom_id == `cool_modal`) {
            
            await fetch(`https://discord.com/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
				method: "PATCH",
				headers: {
					"Authorization": `Bot ${process.env.token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
                    content: "Your Demo Has been Successfully Submitted! Looking Forward for you to show off your work! Make sure to join us at our next Office Hours."
				})
			})

            await modal_handler(interaction, req)
            
            res.sendStatus(200)

        } else if(custom_id == 'accept') {

            await fetch(`https://discord.com/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bot ${process.env.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: "**Rules Successfully accepted \✅. Granted Access to the Server.**"
                })
            })

            await fetch(`https://discord.com/api/guilds/${interaction.guild_id}/members/${interaction.member.user.id}/roles/${process.env.verified_role_id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bot ${process.env.token}`
                }
            })
                        
            res.sendStatus(200)

        }  else if(custom_id == 'self_roles') {

            await update_roles(interaction)
    
            await fetch(`https://discord.com/api/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bot ${process.env.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: "**Updated Your Roles as per your choice.**"
                })
            })

            res.sendStatus(200)
        }
    }
})

app.listen("3000", () => console.log(`Server Is Running, You better catch it!`))