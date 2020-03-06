import { GameCommand } from '../game.command';
import { ArgumentDefinition } from 'libs/cah-reborn-client/src/lib/commands/argument';
import { Message } from 'discord.js';

// TODO need access to game?
export class PacksCommand extends GameCommand {
    public get aliases(): string[] {
        return [];
    }
    public get signature(): ArgumentDefinition[] {
        return [];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}