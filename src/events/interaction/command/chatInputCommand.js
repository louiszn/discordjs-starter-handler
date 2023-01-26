import { Client } from "discord.js";

export const event = {
    name: 'interactionCreate',
    /**
     * @param {Client} client 
     * @param {import("discord.js").Interaction} interaction 
     */
    async execute (client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.command.get(interaction.commandName);

        if (!command) return interaction.reply({
            content: 'This command is outdated!',
            ephemeral: true,
        });

        await command.execute(client, interaction);
    }
};
