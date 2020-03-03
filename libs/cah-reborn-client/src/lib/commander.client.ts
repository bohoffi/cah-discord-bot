import { Client, ClientOptions, Message } from 'discord.js';
import { CommandRegistry } from './command-registry';
import { CommandDispatcher } from './command-dispatcher';
import { Communicator } from './utils/communicator';
import { CommanderOptions } from './utils/interfaces';
import { Logger, log } from './utils/logger';

export class CommanderClient extends Client {

    private readonly commandRegistry: CommandRegistry;
    private readonly commandDispatcher: CommandDispatcher;
    private readonly sopCommunicator: Communicator;

    private readonly log$: Logger;

    private commandsLoaded: boolean;

    constructor(private readonly clientOpts?: CommanderOptions & ClientOptions) {
        super(clientOpts);

        this.log$ = log((!!this.opts && this.opts.debug) || false);

        this.commandRegistry = new CommandRegistry(this);
        this.commandDispatcher = new CommandDispatcher(this);
        this.sopCommunicator = new Communicator();

        this.once('ready', () => {
            this.log$('CommanderClient.ready');
        })
            .on('message', (message: Message) => this.handleMessage(message))
            .on('error', (error: Error) => this.onError(error));
    }

    public get opts(): CommanderOptions & ClientOptions {
        return { ...this.options, ...this.clientOpts };
    }

    public get registry(): CommandRegistry {
        return this.commandRegistry;
    }

    public get dispatcher(): CommandDispatcher {
        return this.commandDispatcher;
    }

    public get communicator(): Communicator {
        return this.sopCommunicator;
    }

    private handleMessage(message: Message): void {

        this.log$('message: ', message.content);

        this.commandDispatcher
            .dispatch(message)
            .catch((error: Error) => this.onError(error));
    }

    private onError(error: Error): void {
        console.error('Commander.onError: ', error);
    }
}
