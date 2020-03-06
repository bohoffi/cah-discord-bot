import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class AddCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return ['a'];
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'pack(s)',
                description: 'Adds a pack (use \'all\' to add all available packs)'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}