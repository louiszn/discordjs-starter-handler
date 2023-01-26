import 'dotenv/config';
import { Client, Collection, GatewayIntentBits, GatewayVersion, Partials } from 'discord.js';

import glob from 'glob';
import path from 'path';
import url from 'url';

export const client = new Client({
    intents: Object.keys(GatewayIntentBits),
    partials: Object.keys(Partials),
    rest: { version: GatewayVersion },
});

client.command = new Collection();

const handlerPath = path.join(process.cwd(), 'src', 'handlers').replace(/\\/g, '/');

glob.sync(`${handlerPath}/*.js`).forEach(async (file) => {
    const { default: handler } = await import(url.pathToFileURL(file));
    handler(client);
});

client.login(process.env.BOT_TOKEN);
