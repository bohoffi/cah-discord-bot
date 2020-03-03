import { Message, MessageEmbed } from 'discord.js';

import { log } from '../utils/logger';
import { ArgumentDefinition, Arguments } from './argument';
import { stripIndents } from 'common-tags';
import { CommanderClient } from '../commander.client';

const log$ = log(true);

export abstract class Command<TArgumentsType> {
  constructor(private commandName: string, protected client: CommanderClient) {
    log$('Created command: ', commandName);
  }

  public get name(): string {
    return this.commandName;
  }

  public createHelpEmbed(): MessageEmbed {

    const helpEmbed = new MessageEmbed({
      color: 0x46BDC6,
      title: stripIndents(`__${this.name}__ (${this.aliases().join(', ')})`),
      description: 'Available arguments',
    });

    if (this.signature.length) {
      helpEmbed.fields = this.signature.map(arg => {
        return {
          name: `**${arg.name}**`,
          value: arg.description,
          inline: false
        };
      })
    }

    return helpEmbed;
  }

  public abstract aliases(): string[];

  public abstract get signature(): ArgumentDefinition[];

  /**
   * Runs the command.
   * @param message message which has triggered the command.
   * @param args Command arguments parsed from the messages content.
   */
  public abstract async run(
    message: Message,
    args: Arguments & TArgumentsType
  ): Promise<Message | Message[]>;
}
