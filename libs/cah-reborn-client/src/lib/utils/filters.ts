import { Command } from '../commands/command';

export const commandFilterExact = (cmd: Command<any>, search: string) => {
  return (
    cmd.name === search ||
    (cmd.aliases && cmd.aliases.some((alias: string) => alias === search))
  );
};
export const commandFilterInexact = (cmd: Command<any>, search: string) => {
  return (
    cmd.name.includes(search) ||
    (cmd.aliases && cmd.aliases.some((alias: string) => alias.includes(search)))
  );
};
