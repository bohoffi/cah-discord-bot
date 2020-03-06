import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

// TODO need access to game?
export class ContentsCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return [];
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'pack',
                description: 'Show all cards in a certain pack'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}