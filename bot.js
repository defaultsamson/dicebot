const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")

const search = require("image-search-results").google

const aliases = ["roll", "shoot", "nut", "shid", "fugg", "bop", "succ"]

client.on("ready", () => {
	console.log("Logged in as " + client.user.tag + "!")
})

function roll(num) {
	return Math.floor((Math.random() * num) + 1)
}

client.on("message", m => {
	var mess = m.content

	// If there's an exclaimation point, we know it's a command
	if (mess.indexOf("!") == 0) {
		if (mess.indexOf("overscrönch") == 1) {
			m.channel.send("https://i.imgur.com/BpTCugu.png")
		} else if (mess.indexOf("midair") == 1) {
			m.channel.send("https://i.imgur.com/2ajJU1P.png")
		} else if (mess.indexOf("babo") == 1) {
			m.channel.send("https://i.imgur.com/uXWGKx8.png")
		} else if (mess.indexOf("schlöng") == 1) {
			search({
					query: Math.floor((Math.random() * 20)) == 0 ? "schlong" : "nut",
					count: 100
				}).then((images) => {
				var index = Math.floor(Math.random() * images.length)
				m.channel.send(images[index].url)
			})
		} else {
			for (var i in aliases) {
				// if the alias comes right after the exclaimation point
				if (mess.indexOf(aliases[i]) == 1) {
					var output = ""

					var splits = mess.split(" ")
					if (splits.length > 1) {
						for (var i = 1; i < splits.length; i++) {

							// Adds spacing before the number if applicable
							if (i > 1) output += " "

							try {
								// Casts the string to a number
								var num = +splits[i]
								output += roll(num)
							} catch (err) {
								// the text couldn't be casted to a number
								output += "NaN"
							}
						}
					} else {
						// Default to rolling a 20 sided die
						output = "" + roll(20)
					}

					m.channel.send(output)
				}
			}
		}
	}
})

const token = fs.readFileSync("./token.txt", "utf8")

client.login(token);
