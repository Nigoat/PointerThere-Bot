/*
 * PointerThere Discord Bot
 * Copyright (C) 2026 PointerThere — GPLv3
 */

import { createTicket, claimTicket, closeTicket } from "../utils/ticketManager.js";
import { fetchUserStats } from "../utils/api.js";
import { config } from "../config.js";

export default {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(`Error executing command ${interaction.commandName}:`, err);
        const replyOpts = { content: "❌ An error occurred executing this command.", ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(replyOpts);
        } else {
          await interaction.reply(replyOpts);
        }
      }
      return;
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "select_ticket_category") {
        const category = interaction.values[0];
        await createTicket(interaction, category);
      }
      return;
    }

    if (interaction.isButton()) {
      if (interaction.customId === "claim_ticket") {
        await claimTicket(interaction);
      } else if (interaction.customId === "close_ticket") {
        await closeTicket(interaction);
      } else if (interaction.customId === "verify_yourself") {
        await interaction.deferReply({ ephemeral: true });
        const user = await fetchUserStats(interaction.user.username);
        if (user) {
          if (config.verifiedRoleId) {
            const role = interaction.guild.roles.cache.get(config.verifiedRoleId);
            if (role) {
              await interaction.member.roles.add(role);
            }
          }
          await interaction.editReply({
            content: `✅ Verified! Linked to PointerThere profile **${user.username}** (${user.points} pts).`,
          });
        } else {
          await interaction.editReply({
            content: `❌ Could not find a linked PointerThere account for Discord tag \`${interaction.user.username}\`. Please connect your Discord account in [PointerThere Settings](${config.websiteUrl}/settings).`,
          });
        }
      }
      return;
    }
  },
};
