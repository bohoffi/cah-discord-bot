import { Message } from 'discord.js';
import * as minimist from 'minimist';

import { Logger, log } from './utils/logger';
import { MessageParseResult } from './utils/interfaces';
import { Command } from './commands/command';
import { CommanderClient } from './commander.client';

export class CommandDispatcher {
  private readonly log$: Logger;

  constructor(private readonly client: CommanderClient) {
    this.log$ = log(this.client.opts?.debug);
  }

  public async dispatch(message: Message): Promise<Message | Message[]> {
    if (this.ignoreMessage(message)) {
      this.log$('ignored');
      return null;
    }

    const parsed: MessageParseResult = this.parseMessage(message);
    this.log$('parsed: ', parsed);
    const cmd: Command<any> = this.getCommand(parsed);

    if (!cmd && parsed.help) {
      this.client.communicator.dm(message, this.client.registry.commands.map((c: Command<any>) => c.createHelpEmbed()), 'Sent you a PM!');
    } else if (cmd) {
      return cmd.run(message, parsed);
    }

    return null;
  }

  /**
   * Ignores messages sent by the bot or without the bots prefix.
   * @param message the {@link Message} to check
   */
  private ignoreMessage(message: Message): boolean {
    return message.author.bot || message.author.id === this.client.user.id || !message.content.startsWith(this.client.opts.prefix);
  }

  private parseMessage(message: Message): MessageParseResult {
    return minimist(
      message.content
        // strip the prefix
        .slice(this.client.opts.prefix.length)
        .split(' ')
    );
  }

  private getCommand(args: any): Command<any> {
    if (!args._ || !args._.length) return null;
    const commandName = args._[0];
    delete args._;
    const found: Command<any>[] = this.client.registry.getCommands(commandName);
    return found && found.length ? found[0] : null;
  }
}
