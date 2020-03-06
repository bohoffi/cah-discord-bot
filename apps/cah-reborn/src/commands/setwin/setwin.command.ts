import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class SetwinCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return ['sw'];
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'points',
                description: 'Set number of points needed to win'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}