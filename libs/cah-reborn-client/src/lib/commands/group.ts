import { Command } from './command';
import { MessageEmbed, EmbedField } from 'discord.js';
import { stripIndents } from 'common-tags';
import { ArgumentDefinition } from './argument';

export class CommandGroup {
  constructor(public readonly name: string, public readonly commands: Command[]) { }

  public addCommand(command: Command) {
    this.commands.push(command);
  }

  public createHelpEmbed(): MessageEmbed {

    return new MessageEmbed({
      title: stripIndents(`__**${this.name}**__`),
      fields: this.commands.map<EmbedField>((cmd: Command) => {

          const name = [
              `${cmd.client.opts.prefix}${cmd.name}`,
              ...cmd.aliases.map((alias: string) => `${cmd.client.opts.prefix}${alias}`)]
              .join('/');
          const args = cmd.signature.map((arg: ArgumentDefinition) => `<${arg.name}>`).join(' ');

          return {
              name: `**${name} ${args}**`,
              value: cmd.description,
              inline: false
          };
      })
  })
  }
}
