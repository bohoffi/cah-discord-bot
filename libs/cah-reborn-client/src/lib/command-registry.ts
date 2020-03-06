import { Collection } from 'discord.js';

import { CommandGroup } from './commands/group';
import { Command } from './commands/command';
import { log, Logger } from './utils/logger';
import { commandFilterExact, commandFilterInexact } from './utils/filters';
import { CommanderClient } from './commander.client';

export class CommandRegistry {
  private commandGroups: Collection<string, CommandGroup> = new Collection();
  private unknownCommand: Command;

  private readonly log$: Logger;

  constructor(private client: CommanderClient) {
    this.log$ = log((!!this.client.options && this.client.opts.debug) || false);
  }

  public get unknown(): Command {
    return this.unknownCommand;
  }

  public set unknown(value: Command) {
    this.unknownCommand = value;
  }

  public get groups(): CommandGroup[] {
    return this.commandGroups.array();
  }

  public get commands(): Command[] {
    return this.commandGroups.reduce(
      (acc: Command[], group: CommandGroup) => {
        return [...acc, ...group.commands];
      },
      []
    ).filter((c: Command) => !!c);
  }

  public registerGroups(groups: CommandGroup[]): CommandRegistry {
    groups.forEach((group: CommandGroup) => this.registerGroup(group));
    return this;
  }

  public registerGroup(group: CommandGroup): CommandRegistry {
    if (this.commandGroups.has(group.name)) {
      throw new Error(
        `There is already a group named '${group.name}' registered!`
      );
    }
    this.commandGroups.set(group.name, group);
    this.log$('registered group: ', group.name);
    return this;
  }

  public getCommands(
    searchFilter: string = null,
    exact: boolean = false
  ): Command[] {
    if (!searchFilter) {
      return this.commands;
    }

    // Find all matches
    const lcSearch = searchFilter.toLowerCase();

    const matchedCommands = this.commands.filter(
      (cmd: Command) =>
        exact
          ? commandFilterExact(cmd, lcSearch)
          : commandFilterInexact(cmd, lcSearch)
    );

    if (exact) return matchedCommands;

    // See if there's an exact match
    for (const command of matchedCommands) {
      if (
        command.name === lcSearch ||
        (command.aliases && command.aliases.some((alias: string) => alias === lcSearch))
      ) {
        return [command];
      }
    }

    return matchedCommands;
  }
}
