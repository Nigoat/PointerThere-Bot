import dotenv from "dotenv";
dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN || "",
  clientId: process.env.CLIENT_ID || "",
  guildId: process.env.GUILD_ID || "",
  welcomeChannelId: process.env.WELCOME_CHANNEL_ID || "",
  ticketCategoryId: process.env.TICKET_CATEGORY_ID || "",
  supportRoleId: process.env.SUPPORT_ROLE_ID || "",
  verifiedRoleId: process.env.VERIFIED_ROLE_ID || "",
  apiUrl: process.env.POINTERTHERE_API_URL || "http://localhost:8080/api",
  websiteUrl: process.env.POINTERTHERE_WEBSITE_URL || "http://localhost:3000",
};
