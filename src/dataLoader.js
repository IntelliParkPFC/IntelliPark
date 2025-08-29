import fs from 'fs';

export function loadJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function storeReadings(client, data) {
  for (const item of data) {
    const timestamp = new Date(item.timestamp);
    const itemStr = { ...item, timestamp: timestamp.toISOString() };
    const key = `lectura:${item.patente}:${Math.floor(timestamp.getTime() / 1000)}`;
    await client.set(key, JSON.stringify(itemStr));
  }
  console.log("Lecturas almacenadas en Redis.");
}

export async function fetchReadings(client) {
  const keys = await client.keys('lectura:*');
  const readings = [];
  for (const key of keys) {
    const jsonData = await client.get(key);
    if (jsonData) {
      const item = JSON.parse(jsonData);
      item.timestamp = new Date(item.timestamp);
      readings.push(item);
    }
  }
  console.log(`Se recuperaron ${readings.length} lecturas de Redis.`);
  return readings;
}