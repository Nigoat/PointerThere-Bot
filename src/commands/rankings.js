import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { fetchRankings } from "../utils/api.js";

export const data = new SlashCommandBuilder()
  .setName("rankings")
  .setDescription("Display top players from PointerThere leaderboards");

export async function execute(interaction) {
  await interaction.deferReply();

  const players = await fetchRankings(10);
  if (!players || players.length === 0) {
    return interaction.editReply({
      content: "❌ Leaderboard data is currently unavailable.",
    });
  }

  const listText = players.map((p, idx) => {
    const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `\`#${idx + 1}\``;
    return `${medal} **${p.username}** — ${p.points.toFixed(2)} pts (${p.country || "Global"})`;
  }).join("\n");

  const embed = new EmbedBuilder()
    .setColor(0x00d4ff)
    .setTitle("🏆 PointerThere Leaderboard — Top 10 Players")
    .setDescription(listText)
    .setTimestamp();

  await interaction.editReply({ embeds: [embed] });
}
