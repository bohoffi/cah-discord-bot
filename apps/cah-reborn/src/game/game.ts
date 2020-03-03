import { Player } from './player';
import { State } from './state';
import { TextChannel } from 'discord.js';

export class Game {
    private players: Player[] = [];
    private state: State = State.Initialization;

    public get isInitialized(): boolean {
        return this.state === State.Initialization
            || this.isRunning;
    }

    public get isRunning(): boolean {
        return this.state === State.Running
            || this.state === State.Dealing
            || this.state === State.Setting
            || this.state === State.Picking;
    }

    public get getPlayers(): Player[] {
        return this.players;
    }

    public getPlayer(id: string): Player {
        return this.players.find((p: Player) => p.id === id);
    }

    public join(id: string, username: string): void {
        this.players.push(new Player(id, username));
    }

    public leave(id: string): void {
        this.players = this.players.filter((p: Player) => p.id !== id);
    }

    public set played(playerId: string) {
        this.players.find((p: Player) => p.id === playerId).hasPlayed = true;
    }
}
