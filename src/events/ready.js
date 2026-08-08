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
    client.user.setActivity("pointerthere.vercel.app | /demon", { type: ActivityType.Watching });
  },
};
