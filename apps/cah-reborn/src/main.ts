import { BOT_TOKEN } from './consts';
import { CommandGroup } from '@cah-reborn-client';
import { JoinCommand } from './commands/join/join.command';
import { LeaveCommand } from './commands/leave/leave.command';
import { CahReloadedClient } from './client/cah-reloaded.client';
import { StartCommand } from './commands/start/start.command';
import { PlayCommand } from './commands/play/play.command';

// create bot client
const cahClient = new CahReloadedClient({
	prefix: 'c!',
	debug: true
});

// register commands
const joinCommand = new JoinCommand('join', cahClient);
const leaveCommand = new LeaveCommand('leave', cahClient);
const startCommand = new StartCommand('start', cahClient);

cahClient.registry.registerGroup(
	new CommandGroup('Pre-game', [
		joinCommand,
		leaveCommand,
		startCommand
	])
);
cahClient.registry.registerGroup(
	new CommandGroup('Ongoing game', [
		joinCommand,
		leaveCommand,
		new PlayCommand('play', cahClient)
	])
);

// start the client
cahClient
	.login(BOT_TOKEN)
	.then(() => console.log('LOGIN DONE'))
	.catch((error: Error) => console.error('Error logging in: ', error));
