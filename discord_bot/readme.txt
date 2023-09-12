This is a discord bot that uses !dota-mmr <string> as an input. <string> -> is a 32-bit SteamId. It uses OpenDota API to get recent matches and estimate MMR.
The bot cannot get information if you are trying to pull information from an account with a private match history. It is the first time I was doing a Discord bot so don't judge me hard.
discord_bot contains node and source folders. The node folder contains node.js and the source folder contains discordbot.js which is the main js file and other js files.
In the future, if I choose to finish the project I guess I will move default bot commands into a different js file, (right now it has a delete command in the main file)
and expand the bot into getting info from Dota replays.
