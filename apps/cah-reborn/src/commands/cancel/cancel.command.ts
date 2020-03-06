import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class CancelCommand extends GameCommand {
    public get aliases(): string[] {
        return ['c'];
    }
    public get signature(): ArgumentDefinition[] {
        return [];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}