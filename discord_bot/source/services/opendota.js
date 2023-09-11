// services/opendota.js
import fetch from "node-fetch";

export async function getDota2MMR(steamId) {
  const openDotaApiUrl = `https://api.opendota.com/api/players/${steamId}`;
  const response = await fetch(openDotaApiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.mmr_estimate.estimate; // Access the MMR estimate field in the response.
}

export async function getRecentMatches(steamId) {
  const matchHistoryUrl = `https://api.opendota.com/api/players/${steamId}/matches?limit=10`;
  const response = await fetch(matchHistoryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const matches = await response.json();
  return matches;
}
