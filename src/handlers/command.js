import { Client, Routes } from "discord.js";
import path from 'path';
import glob from 'glob';
import url from 'url';

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

/**
 * @param {Client} client 
 */
export default async function (client) {
    const commandPath = path.join(process.cwd(), 'src', 'commands');
    const commandFile = glob.sync(`${commandPath}/**/*.js`.replace(/\\/g, '/'));

    const publicCommands = [], privateCommands = [];

    for (const file of commandFile) {
        const { command } = await import(url.pathToFileURL(file));

        if (command) {
            if (command.private) {
                privateCommands.push(command.data);
            } else {
                publicCommands.push(command.data);
            }

            client.command.set(command?.data?.name, command);
        }
    }

    const { rest } = client; 
    rest.setToken(BOT_TOKEN);

    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: [...privateCommands],
        });

        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: [...publicCommands],
        });
    } catch (e) {
        console.log(e);
    }
}
