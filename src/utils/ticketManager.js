import { ChannelType, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { config } from "../config.js";

export async function createTicket(interaction, categoryType) {
  const guild = interaction.guild;
  const user = interaction.user;

  // Check existing channel
  const channelName = `ticket-${user.username.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const existing = guild.channels.cache.find(c => c.name === channelName);
  if (existing) {
    return interaction.reply({
      content: `❌ You already have an open ticket: ${existing}`,
      ephemeral: true,
    });
  }

  // Permission overwrites
  const permissionOverwrites = [
    {
      id: guild.id, // @everyone
      deny: [PermissionFlagsBits.ViewChannel],
    },
    {
      id: user.id,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles],
    },
  ];

  if (config.supportRoleId) {
    permissionOverwrites.push({
      id: config.supportRoleId,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels],
    });
  }

  const channel = await guild.channels.create({
    name: channelName,
    type: ChannelType.GuildText,
    parent: config.ticketCategoryId || null,
    permissionOverwrites,
  });

  const ticketEmbed = new EmbedBuilder()
    .setColor(0x00d4ff)
    .setTitle(`🎫 Ticket Created: ${categoryType}`)
    .setDescription(`Hello <@${user.id}>!\nThank you for contacting PointerThere Support. A moderator will assist you shortly.\n\n*Please describe your issue or inquiry in detail below.*`)
    .setTimestamp();

  const buttons = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("claim_ticket")
      .setLabel("Claim Ticket")
      .setStyle(ButtonStyle.Success)
      .setEmoji("✋"),
    new ButtonBuilder()
      .setCustomId("close_ticket")
      .setLabel("Close Ticket")
      .setStyle(ButtonStyle.Danger)
      .setEmoji("🔒")
  );

  await channel.send({
    content: `<@${user.id}> ${config.supportRoleId ? `<@&${config.supportRoleId}>` : ""}`,
    embeds: [ticketEmbed],
    components: [buttons],
  });

  await interaction.reply({
    content: `✅ Ticket created successfully: ${channel}`,
    ephemeral: true,
  });
}

export async function claimTicket(interaction) {
  const channel = interaction.channel;
  const mod = interaction.user;

  const embed = new EmbedBuilder()
    .setColor(0x3fb950)
    .setDescription(`✋ Ticket claimed by <@${mod.id}>.`);

  await channel.send({ embeds: [embed] });
  await interaction.reply({ content: "You claimed this ticket.", ephemeral: true });
}

export async function closeTicket(interaction) {
  const channel = interaction.channel;

  await interaction.reply({ content: "🔒 Closing ticket in 5 seconds..." });

  setTimeout(async () => {
    try {
      await channel.delete("Ticket closed by user/staff");
    } catch (err) {
      console.error("Failed to delete ticket channel:", err);
    }
  }, 5000);
}
