import { Command } from '@cah-reborn-client';
import { CahReloadedClient } from '../client/cah-reloaded.client';

export abstract class GameCommand<T> extends Command<T> {
    constructor(name: string, client: CahReloadedClient) {
        super(name, client);
    }

    public get gameClient(): CahReloadedClient {
        return this.client as CahReloadedClient;
    }
}