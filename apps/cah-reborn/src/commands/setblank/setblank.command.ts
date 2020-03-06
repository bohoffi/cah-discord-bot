import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class SetblankCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return [];
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'blanks',
                description: 'Set number of blank cards'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}