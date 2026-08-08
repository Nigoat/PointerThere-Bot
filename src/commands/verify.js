/*
 * PointerThere Discord Bot
 * Copyright (C) 2026 PointerThere — GPLv3
 */

import { SlashCommandBuilder } from "discord.js";
import { config } from "../config.js";
import { fetchUserStats } from "../utils/api.js";

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Verify and link your PointerThere profile");

export async function execute(interaction) {
  await interaction.deferReply({ ephemeral: true });
  const user = await fetchUserStats(interaction.user.username);

  if (!user) {
    await interaction.editReply(
      `❌ Could not find a linked PointerThere account. Connect Discord in ${config.websiteUrl}/settings, then run \`/verify\` again.`
    );
    return;
  }

  if (config.verifiedRoleId) {
    const role = interaction.guild?.roles.cache.get(config.verifiedRoleId);
    if (role) await interaction.member.roles.add(role);
  }

  await interaction.editReply(`✅ Verified! Linked to PointerThere profile **${user.username}** (${user.points} pts).`);
}
