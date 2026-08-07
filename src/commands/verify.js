import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { config } from "../config.js";

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Link your Discord account with your PointerThere website profile");

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x3fb950)
    .setTitle("🔗 PointerThere Discord Account Verification")
    .setDescription(
      `To link your Discord account with PointerThere:\n\n` +
      `1. Log in to [PointerThere Settings](${config.websiteUrl}/settings)\n` +
      `2. Click **Connect Discord** under Connected Accounts\n` +
      `3. Once connected, click the **Check Verification** button below to sync your role.`
    );

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setLabel("Go to Settings")
      .setStyle(ButtonStyle.Link)
      .setURL(`${config.websiteUrl}/settings`),
    new ButtonBuilder()
      .setCustomId("check_verification")
      .setLabel("Check Verification")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("✅")
  );

  await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}
