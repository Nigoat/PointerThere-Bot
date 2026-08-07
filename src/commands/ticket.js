/*
 * PointerThere Discord Bot
 * Copyright (C) 2024 PointerThere — GPLv3
 */

import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ticket")
  .setDescription("Send ticket creation panel (Staff only)");

export async function execute(interaction) {
  if (!interaction.memberPermissions?.has("Administrator")) {
    return interaction.reply({
      content: "❌ You need Administrator permissions to deploy the ticket panel.",
      ephemeral: true,
    });
  }

  const embed = new EmbedBuilder()
    .setColor(0x00d4ff)
    .setTitle("🎫 PointerThere Support & Support Panel")
    .setDescription(
      "Need assistance? Select a category from the dropdown menu below to open a private ticket with our staff team.\n\n" +
      "**Available Categories:**\n" +
      "• 📜 **Record Appeal / Inquiry** — Questions regarding submitted completions\n" +
      "• 🔨 **Ban Appeal** — Appeal a forum or list ban\n" +
      "• ⚙️ **Account & Technical Support** — General issues or API access\n" +
      "• ❓ **Other** — General community inquiries"
    );

  const select = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("select_ticket_category")
      .setPlaceholder("Select a ticket category...")
      .addOptions(
        {
          label: "Record Inquiry / Appeal",
          description: "Questions about your record submission",
          value: "Record Inquiry",
          emoji: "📜",
        },
        {
          label: "Ban Appeal",
          description: "Appeal a platform suspension or ban",
          value: "Ban Appeal",
          emoji: "🔨",
        },
        {
          label: "Technical Support",
          description: "API keys, 2FA, or account recovery",
          value: "Technical Support",
          emoji: "⚙️",
        },
        {
          label: "General Inquiry",
          description: "All other questions",
          value: "General Inquiry",
          emoji: "❓",
        }
      )
  );

  await interaction.reply({ content: "Deploying ticket panel...", ephemeral: true });
  await interaction.channel.send({ embeds: [embed], components: [select] });
}
