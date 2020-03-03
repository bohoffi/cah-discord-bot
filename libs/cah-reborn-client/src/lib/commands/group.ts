import { Command } from './command';

export class CommandGroup {
  constructor(private groupName: string, private entries: Command<any>[]) { }

  public get name(): string {
    return this.groupName;
  }

  public get commands(): Command<any>[] {
    return this.entries;
  }

  public addCommand(command: Command<any>) {
    this.entries.push(command);
  }
}
