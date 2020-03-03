import { Message } from 'discord.js';
import { ArgumentDefinition } from '@cah-reborn-client';
import { GameCommand } from '../game.command';

export class JoinCommand extends GameCommand<any> {
    public aliases(): string[] {
        return [
            'j'
        ];
    }

    public get signature(): ArgumentDefinition[] {
        return [];
    }

    public run(message: Message, args: any): Promise<Message | Message[]> {

        const authorId = message.author.id
        const userName = message.guild.members.cache.get(authorId).nickname || message.guild.members.cache.get(authorId).user.username

        this.gameClient.game.join(authorId, userName);

        return message.channel.send(`${userName} has joined the game.`);
    }
}