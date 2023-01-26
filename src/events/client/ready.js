import { Client } from "discord.js";

export const event = {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute (client) {
        console.log(`${client.user.tag} is ready!`);
    },
};
