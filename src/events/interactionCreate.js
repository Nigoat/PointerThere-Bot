import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { createHmac } from "node:crypto";
import { createTicket, claimTicket, closeTicket } from "../utils/ticketManager.js";
import { config } from "../config.js";

function createVerificationToken(discordId) {
  const expiresAt = Math.floor(Date.now() / 1000) + 10 * 60;
  const payload = Buffer.from(`${discordId}.${expiresAt}`).toString("base64url");
  const signature = createHmac("sha256", config.verificationSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

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
        if (interaction.replied || interaction.deferred) await interaction.followUp(replyOpts);
        else await interaction.reply(replyOpts);
      }
      return;
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId === "select_ticket_category") await createTicket(interaction, interaction.values[0]);
      return;
    }

    if (!interaction.isButton()) return;
    if (interaction.customId === "claim_ticket") await claimTicket(interaction);
    else if (interaction.customId === "close_ticket") await closeTicket(interaction);
    else if (interaction.customId === "verify_yourself") {
      if (!config.verificationSecret) {
        await interaction.reply({ content: "❌ Verification is not configured yet. Please contact an administrator.", ephemeral: true });
        return;
      }
      const token = createVerificationToken(interaction.user.id);
      const url = `${config.websiteUrl}/verify?token=${encodeURIComponent(token)}`;
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel("Verify on PointerThere").setStyle(ButtonStyle.Link).setURL(url)
      );
      await interaction.reply({ content: "Complete the Cloudflare check to receive the Verified role.", components: [row], ephemeral: true });
    }
  },
};
