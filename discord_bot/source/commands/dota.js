// commands/dota.js
import { getHeroName } from "../services/heroes.js";

export function sendMMRAndMatchesMessage(client, channel, mmr, matches) {
    const mmrMessage = `Dota 2 MMR: ${mmr}`;
    const matchesMessage = matches
      .map(
        (match) =>
          `Match ID: ${match.match_id}\nHero: ${getHeroName(
            match.hero_id
          )}\nResult: ${
            match.player_slot < 128 === match.radiant_win ? "Win" : "Loss"
          }\nScore: ${match.kills}/${match.deaths}/${match.assists}\n-----`
      )
      .join("\n");
  
    channel.send(`${mmrMessage}\n\nRecent Matches:\n${matchesMessage}`);
}