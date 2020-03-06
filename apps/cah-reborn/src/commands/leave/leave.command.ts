import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';
import { GameCommand } from '../game.command';

export class LeaveCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return [
            'l'
        ]
    }

    public get signature(): ArgumentDefinition[] {
        return [];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        const authorId = message.author.id
        const userName = message.guild.members.cache.get(authorId).nickname || message.guild.members.cache.get(authorId).user.username

        this.gameClient.game.leave(authorId);

        return message.channel.send(`${userName} has left the game.`);
    }
}