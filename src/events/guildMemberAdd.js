import { EmbedBuilder } from "discord.js";
import { config } from "../config.js";

export default {
  name: "guildMemberAdd",
  async execute(member) {
    if (!config.welcomeChannelId) return;

    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor(0x00d4ff)
      .setTitle(`Welcome to PointerThere, ${member.user.username}! 🎉`)
      .setDescription(
        `Welcome to the official **PointerThere** community server!\n\n` +
        `• Check out the demon list at [pointerthere.com](${config.websiteUrl})\n` +
        `• Link your account using \`/verify\` to get the Verified role\n` +
        `• Need help? Open a ticket using \`/ticket\``
      )
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp();

    await channel.send({ content: `Welcome <@${member.id}>!`, embeds: [embed] });
  },
};
