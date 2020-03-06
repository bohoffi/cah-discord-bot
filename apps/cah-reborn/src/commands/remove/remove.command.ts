import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class RemoveCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return ['rm']
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'pack(s)',
                description: 'Remove a pack (use \'base\' for original pack)'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}