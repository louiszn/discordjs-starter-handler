import { Client } from "discord.js";
import path from 'path';
import glob from 'glob';
import url from 'url';

/**
 * @param {Client} client 
 */
export default async function (client) {
    const eventPath = path.join(process.cwd(), 'src', 'events');
    const eventFile = glob.sync(`${eventPath}/**/*.js`.replace(/\\/g, '/'));

    for (const file of eventFile) {
        const { event } = await import(url.pathToFileURL(file));

        if (event) {
            if (event.rest) {
                if (event.once) {
                    client.rest.once(event.name, async (...args) => event.execute(client, ...args));
                } else {
                    client.rest.on(event.name, async (...args) => event.execute(client, ...args));
                }
            } else {
                if (event.once) {
                    client.once(event.name, async (...args) => event.execute(client, ...args));
                } else {
                    client.on(event.name, async (...args) => event.execute(client, ...args));
                }
            }
        }
    }
};

