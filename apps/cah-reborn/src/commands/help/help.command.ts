import { Command, ArgumentDefinition, CommandGroup } from '@cah-reborn-client';
import { Message, MessageEmbed, EmbedField } from 'discord.js';
import { stripIndents } from 'common-tags';

export class HelpCommand extends Command {
    public get aliases(): string[] {
        return [];
    }
    public get signature(): ArgumentDefinition[] {
        return [];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {

        const groups: CommandGroup[] = this.client.registry.groups;

        groups.forEach((group: CommandGroup, index: number) => {
            message.channel.send(new MessageEmbed({
                title: stripIndents(`__**${group.name}**__`),
                fields: group.commands.map<EmbedField>((cmd: Command) => {

                    const name = [
                        `${this.client.opts.prefix}${cmd.name}`,
                        ...cmd.aliases.map((alias: string) => `${this.client.opts.prefix}${alias}`)]
                        .join('/');
                    const args = cmd.signature.map((arg: ArgumentDefinition) => `<${arg.name}>`).join(' ');

                    return {
                        name: `**${name} ${args}**`,
                        value: cmd.description,
                        inline: false
                    };
                })
            }));
        });

        return null;
    }
}