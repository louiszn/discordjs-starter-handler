import { ChatInputCommandInteraction, Client } from "discord.js";

export const command = {
    data: {
        name: 'ping',
        description: 'Pong',
    },
    /**
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute (client, interaction) {
        interaction.reply({
            content: `Pong! ${client.ws.ping} ms!`,
        });
    }
};
