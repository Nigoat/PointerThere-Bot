/*
 * PointerThere Discord Bot
 * Copyright (C) 2026 PointerThere — GPLv3
 */

import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Send the PointerThere verification panel");

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x3fb950)
    .setTitle("PointerThere Account Verification")
    .setDescription("Press **Verify** below to link your Discord account and receive the Verified role.");

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("verify_yourself")
      .setLabel("Verify")
      .setStyle(ButtonStyle.Success)
      .setEmoji("✅")
  );

  await interaction.reply({ embeds: [embed], components: [row] });
}
