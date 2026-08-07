/*
 * PointerThere Discord Bot
 * Copyright (C) 2024 PointerThere — GPLv3
 */

import fetch from "node-fetch";
import { config } from "../config.js";

export async function fetchDemon(idOrRank) {
  try {
    const res = await fetch(`${config.apiUrl}/list/${idOrRank}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.level || null;
  } catch (err) {
    console.error("API error fetching demon:", err.message);
    return null;
  }
}

export async function fetchRankings(limit = 10) {
  try {
    const res = await fetch(`${config.apiUrl}/rankings?limit=${limit}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.players || [];
  } catch (err) {
    console.error("API error fetching rankings:", err.message);
    return [];
  }
}

export async function fetchUserStats(username) {
  try {
    const res = await fetch(`${config.apiUrl}/users?q=${encodeURIComponent(username)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.users && data.users.length > 0) {
      return data.users[0];
    }
    return null;
  } catch (err) {
    console.error("API error fetching user stats:", err.message);
    return null;
  }
}
