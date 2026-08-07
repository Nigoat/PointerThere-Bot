/*
 * PointerThere Discord Bot
 * Copyright (C) 2026 PointerThere — GPLv3
 */

import { ActivityType } from "discord.js";

export default {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`[PointerThere Bot] Logged in as ${client.user.tag}`);
    client.user.setActivity("pointerthere.com | /demon", { type: ActivityType.Watching });
  },
};
