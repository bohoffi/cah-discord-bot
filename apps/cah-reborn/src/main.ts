import { BOT_TOKEN } from './consts';
import { CommandGroup } from '@cah-reborn-client';
import { JoinCommand } from './commands/join/join.command';
import { LeaveCommand } from './commands/leave/leave.command';
import { CahReloadedClient } from './client/cah-reloaded.client';
import { StartCommand } from './commands/start/start.command';
import { PlayCommand } from './commands/play/play.command';
import { CancelCommand } from './commands/cancel/cancel.command';
import { AddCommand } from './commands/add/add.command';
import { RemoveCommand } from './commands/remove/remove.command';
import { PacksCommand } from './commands/packs/packs.command';
import { ContentsCommand } from './commands/contents/contents.command';
import { SetwinCommand } from './commands/setwin/setwin.command';
import { TimerCommand } from './commands/timer/timer.command';
import { SetblankCommand } from './commands/setblank/setblank.command';
import { DisplayCommand } from './commands/display/display.command';
import { ResetCommand } from './commands/reset/reset.command';
import { KickCommand } from './commands/kick/kick.command';
import { HelpCommand } from './commands/help/help.command';
import { WhatsnewCommand } from './commands/whatsnew/whatsnew.command';

// create bot client
const client = new CahReloadedClient({
	prefix: 'c!',
	debug: true
});

// register commands
const joinCommand = new JoinCommand('join', client, 'Join a game of CAH');
const leaveCommand = new LeaveCommand('leave', client, 'Leave a game of CAH');

client.registry.registerGroup(
	new CommandGroup('Pre-game', [
		new StartCommand('start', client, 'Start a game of Cards Against Humanity'),
		new CancelCommand('cancel', client, 'Cancel a game of CAH'),
		new AddCommand('add', client, 'Add a pack (use "c!add all" to add all available packs)'),
		new RemoveCommand('remove', client, 'Remove a pack (use \'base\' for original pack)'),
		new PacksCommand('packs', client, 'Show a list of all available packs'),
		new ContentsCommand('contents', client, 'Show all cards in a certain pack'),
		new SetwinCommand('setwin', client, 'Set number of points needed to win'),
		new TimerCommand('timer', client, 'Set idle timer'),
		new SetblankCommand('setblank', client, 'Set number of blank cards'),
		joinCommand,
		leaveCommand,
	])
);
client.registry.registerGroup(
	new CommandGroup('Ongoing game', [
		new PlayCommand('play', client, 'Play the selected cards'), ,
		new DisplayCommand('display', client, 'Re-display the current scoreboard/black card'),
		new ResetCommand('reset', client, 'Reset an ongoing game of CAH'),
		joinCommand,
		leaveCommand,
		new KickCommand('kick', client, 'Vote to kick a player')
	])
);
client.registry.registerGroup(new CommandGroup('Global commands', [
	new HelpCommand('help', client, 'Brings up a help message'),
	new WhatsnewCommand('whatsnew', client, 'Show the changelog')
]));

// start the client
client
	.login(BOT_TOKEN)
	.then(() => console.log('LOGIN DONE'))
	.catch((error: Error) => console.error('Error logging in: ', error));
