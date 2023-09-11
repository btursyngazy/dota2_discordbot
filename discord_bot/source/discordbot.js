import { Client, IntentsBitField } from "discord.js";
import { sendMMRAndMatchesMessage } from "./commands/dota.js";
import { getDota2MMR, getRecentMatches } from "./services/opendota.js";
import { discordBotToken } from "./config.js"; //Import the Discord bot token

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`${client.user.tag} is ready to carry on Nyx Assassin`);
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("!dota-mmr")) {
    try {
      // Extract the Steam ID from the user's message
      const args = message.content.split(" ");
      if (args.length !== 2) {
        message.reply("Please provide a valid Steam ID.");
        return;
      }
      const steamId = args[1]; // Assuming the Steam ID is provided as the second argument

      // Make API requests using the provided Steam ID
      const mmr = await getDota2MMR(steamId);
      const recentMatches = await getRecentMatches(steamId);

      // Pass the 'client' object and the channel where you want to send the message
      sendMMRAndMatchesMessage(client, message.channel, mmr, recentMatches);
    } catch (error) {
      console.error("Error:", error);
      // Handle the error gracefully, e.g., send an error message to the user.
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === "!delete" && message.guild) {
    // Check if the command is sent in a server
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
      // Check if the user has the necessary permissions to delete messages
      const channel = message.channel;

      try {
        // Fetch and delete the bot's messages in the channel
        const botMessages = await channel.messages.fetch({ limit: 100 });
        const botMessagesToDelete = botMessages.filter(
          (msg) => msg.author.id === client.user.id
        );
        await channel.bulkDelete(botMessagesToDelete, true); // 'true' deletes messages that are older than 14 days

        message.reply(`Deleted ${botMessagesToDelete.size} bot messages.`);
      } catch (error) {
        console.error("Error deleting messages:", error);
        message.reply("An error occurred while deleting messages.");
      }
    } else {
      message.reply("You do not have permission to use this command.");
    }
  }
});

//Log in the Discord bot
client.login(discordBotToken);
