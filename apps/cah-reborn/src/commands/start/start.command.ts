import { GameCommand } from '../game.command';
import { ArgumentDefinition, asInlineCode } from '@cah-reborn-client';
import { Message, Util } from 'discord.js';

export class StartCommand extends GameCommand<any> {
    public aliases(): string[] {
        return [
            's'
        ];
    }

    public get signature(): ArgumentDefinition[] {
        return [];
    }

    public run(message: Message, args: any): Promise<Message | Message[]> {

        console.log('initialized: ', this.gameClient.game?.isInitialized);
        console.log('running: ', this.gameClient.game?.isRunning);

        if (this.gameClient.game?.isRunning) {
            console.log('running');
            return message.channel.send('Finish the current game first!');
        }

        if (!this.gameClient.game?.isInitialized && !this.gameClient.game?.isRunning) {
            this.gameClient.initGame();
            console.log('initialize');
            return message.channel.send(`Once everyone has joined, type ${asInlineCode('c!start')} again to begin.`);
        }

        if (this.gameClient.game?.isInitialized && !this.gameClient.game?.isRunning) {

            if (!this.gameClient.game.getPlayers.length) {
                return message.channel.send('Players have to join first!');
            }
            

            console.log('starting');
            const x = [
                'Game ist starting!',
                this.gameClient.game.getPlayers.map(p => p.mention).join(' ')
            ];

            return message.channel.send(x.join(`\n`));
        }
    }
}