import { Client } from "discord.js";

export const event = {
    name: 'interactionCreate',
    /**
     * @param {Client} client 
     * @param {import("discord.js").Interaction} interaction 
     */
    async execute (client, interaction) {
        if (!interaction.isAutocomplete()) return;

        const command = client.command.get(interaction.commandName);

        if (!command) return;

        await command.autocomplete(client, interaction);
    }
};
