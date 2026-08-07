/*
 * PointerThere Discord Bot
 * Copyright (C) 2024 PointerThere — GPLv3
 */

import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { fetchUserStats } from "../utils/api.js";

export const data = new SlashCommandBuilder()
  .setName("stats")
  .setDescription("View player statistics on PointerThere")
  .addStringOption(option =>
    option.setName("username")
      .setDescription("PointerThere Username")
      .setRequired(true)
  );

export async function execute(interaction) {
  const username = interaction.options.getString("username");
  await interaction.deferReply();

  const user = await fetchUserStats(username);
  if (!user) {
    return interaction.editReply({
      content: `❌ User \`${username}\` not found on PointerThere.`,
    });
  }

  const embed = new EmbedBuilder()
    .setColor(0x00d4ff)
    .setTitle(`👤 Player Profile: ${user.username}`)
    .addFields(
      { name: "Points", value: `${user.points || 0} pts`, inline: true },
      { name: "Country", value: user.country || "Unspecified", inline: true },
      { name: "Continent", value: user.continent || "Unspecified", inline: true },
      { name: "Approved Records", value: `${user.records_count || 0}`, inline: true },
      { name: "Status", value: user.is_banned ? "🔴 Banned" : "🟢 Active", inline: true }
    )
    .setTimestamp();

  if (user.avatar_url) {
    embed.setThumbnail(user.avatar_url);
  }

  await interaction.editReply({ embeds: [embed] });
}
