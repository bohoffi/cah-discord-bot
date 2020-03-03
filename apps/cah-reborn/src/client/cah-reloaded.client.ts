import { CommanderClient } from '@cah-reborn-client';
import { Game } from '../game/game';

export class CahReloadedClient extends CommanderClient {

    private gameInstance: Game = null;

    public get game(): Game {
        return this.gameInstance;
    }

    public initGame(): void {
        this.gameInstance = new Game();
    }

    public resetGame(): void {
        this.gameInstance = new Game();
    }
}
