import { GameCommand } from '../game.command';
import { ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class PlayCommand extends GameCommand<any> {
    public get aliases(): string[] {
        return [
            'p'
        ];
    }
    public get signature(): ArgumentDefinition[] {
        return [
            {
                name: 'card(s)',
                description: 'Play the selected cards'
            }
        ];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {

        const player = this.gameClient.game.getPlayer(message.author.id);

        const channel = message.channel;
        message.delete();

        // if player hasn't joined
        if (!player) {
            return channel.send('You have to join before playing!');
        }

        // TODO store played card

        return channel.send(`${player.username} has played!`);
    }
}