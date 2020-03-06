import { Command } from '@cah-reborn-client';
import { CahReloadedClient } from '../client/cah-reloaded.client';

export abstract class GameCommand<T = any> extends Command<T> {
    constructor(name: string, client: CahReloadedClient, description?: string) {
        super(name, client, description);
    }

    public get gameClient(): CahReloadedClient {
        return this.client as CahReloadedClient;
    }
}