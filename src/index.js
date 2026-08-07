/*
 * PointerThere Discord Bot
 * Copyright (C) 2024 PointerThere — GPLv3
 */

import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import { config } from "./config.js";
import * as demonCmd from "./commands/demon.js";
import * as rankingsCmd from "./commands/rankings.js";
import * as statsCmd from "./commands/stats.js";
import * as ticketCmd from "./commands/ticket.js";
import * as verifyCmd from "./commands/verify.js";
import readyEvent from "./events/ready.js";
import guildMemberAddEvent from "./events/guildMemberAdd.js";
import interactionCreateEvent from "./events/interactionCreate.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commands = [demonCmd, rankingsCmd, statsCmd, ticketCmd, verifyCmd];
const commandData = [];

for (const cmd of commands) {
  client.commands.set(cmd.data.name, cmd);
  commandData.push(cmd.data.toJSON());
}

client.once(readyEvent.name, (...args) => readyEvent.execute(...args, client));
client.on(guildMemberAddEvent.name, (...args) => guildMemberAddEvent.execute(...args, client));
client.on(interactionCreateEvent.name, (...args) => interactionCreateEvent.execute(...args, client));

async function registerCommands() {
  if (!config.token || !config.clientId) {
    console.warn("[PointerThere Bot] DISCORD_TOKEN or CLIENT_ID is missing.");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(config.token);

  try {
    if (config.guildId) {
      await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
        body: commandData,
      });
    } else {
      await rest.put(Routes.applicationCommands(config.clientId), {
        body: commandData,
      });
    }
  } catch (err) {
    console.error("[PointerThere Bot] Failed to register slash commands:", err);
  }
}

if (config.token) {
  registerCommands().then(() => {
    client.login(config.token);
  });
}
