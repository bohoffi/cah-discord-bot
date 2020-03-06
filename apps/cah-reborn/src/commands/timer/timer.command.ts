import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class TimerCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return ['t'];
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'seconds',
                description: 'Set idle timer'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}