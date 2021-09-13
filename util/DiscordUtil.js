const { BOT_HEX } = require("../botconfig.json");
module.exports = (bot) => {
	bot.Discord = require("discord.js");
	bot.Util = require("./util");

	bot.emptyEmbed = new bot.Discord.MessageEmbed();
	bot.defaultEmbed = bot.emptyEmbed.setColor(BOT_HEX);

	bot.sendMessage = (message, timeout = undefined) => {
		return bot.sendMessageChannel(message.content, message.channel, timeout);
	};
	// returns true if successfully deleted temp message
	// else returns sent message
	bot.sendMessageChannel = (message, channel, timeout = undefined) => {
		return bot.Util.catch(
			channel.send(message).then((sentMessage) => {
				if (!isNaN(timeout)) {
					setTimeout(() => {
						sentMessage.delete();
						return true;
					}, timeout);
				} else return sentMessage;
			})
		);
	};
	bot.sendReplyMessageChannel = ({ reply }, message) => {
		return bot.Util.catch(
			reply({ content: message, ephemeral: true }).then((sentReply) => {
				return sentReply;
			})
		);
	};
	bot.sendEmbedChannel = (embed, channel) => {
		return bot.Util.catch(
			channel.send({ embeds: [embed] }).then((sentEmbed) => {
				return sentEmbed;
			})
		);
	};
};
