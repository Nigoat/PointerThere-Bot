/*
 * PointerThere Discord Bot
 * Copyright (C) 2026 PointerThere — GPLv3
 */

import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { fetchDemon } from "../utils/api.js";

export const data = new SlashCommandBuilder()
  .setName("demon")
  .setDescription("View details of a demon level from PointerThere")
  .addStringOption(option =>
    option.setName("query")
      .setDescription("Rank number or Demon Name")
      .setRequired(true)
  );

export async function execute(interaction) {
  const query = interaction.options.getString("query");
  await interaction.deferReply();

  const demon = await fetchDemon(query);
  if (!demon) {
    return interaction.editReply({
      content: `❌ Could not find a demon level matching \`${query}\`.`,
    });
  }

  const embed = new EmbedBuilder()
    .setColor(demon.rank <= 10 ? 0x00d4ff : 0xa855f7)
    .setTitle(`#${demon.rank} — ${demon.name}`)
    .addFields(
      { name: "Verified By", value: demon.verified_by || "Unknown", inline: true },
      { name: "Creators", value: (demon.creators && demon.creators.length) ? demon.creators.join(", ") : "Unknown", inline: true },
      { name: "Points", value: `${demon.points} pts`, inline: true },
      { name: "Tier", value: demon.difficulty_tier === "extreme" ? "🔴 Extreme Demon" : "🟣 Insane Demon", inline: true },
      { name: "Video Proof", value: demon.video_url ? `[Watch Recording](${demon.video_url})` : "None", inline: true }
    )
    .setTimestamp();

  if (demon.thumbnail_url) {
    embed.setThumbnail(demon.thumbnail_url);
  }

  await interaction.editReply({ embeds: [embed] });
}
