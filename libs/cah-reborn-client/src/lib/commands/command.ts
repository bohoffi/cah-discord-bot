import { Message, MessageEmbed } from 'discord.js';

import { log } from '../utils/logger';
import { ArgumentDefinition, Arguments } from './argument';
import { stripIndents } from 'common-tags';
import { CommanderClient } from '../commander.client';

const log$ = log(true);

export abstract class Command<TArgumentsType = any> {
  constructor(public readonly name: string, public readonly client: CommanderClient, public readonly description?: string) {
    log$('Created command: ', name);
  }

  public createHelpEmbed(): MessageEmbed {

    const name = [
      `${this.client.opts.prefix}${this.name}`,
      ...this.aliases.map((alias: string) => `${this.client.opts.prefix}${alias}`)]
      .join('/');

    const helpEmbed = new MessageEmbed({
      color: 0x46BDC6,
      title: stripIndents(`__${name}__`),
      description: this.description
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

  public abstract get aliases(): string[];

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
