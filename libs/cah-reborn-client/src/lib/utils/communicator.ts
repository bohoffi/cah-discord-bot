import { Message, DMChannel, StringResolvable, CollectorFilter, AwaitReactionsOptions, Collection, MessageReaction } from "discord.js";

export class Communicator {
    public async dm(message: Message, dms: StringResolvable[], reply: string = null): Promise<Message | Message[]> {
        const dmChannel: DMChannel = await message.author.createDM();

        dms.forEach((dm: string) => {
            dmChannel.send(dm);
        })
        return message.reply(reply || 'I\'ve send you a DM');
    }

    public async prompt(message: Message, time = 5000): Promise<any> {
        message.channel.send('Please enter more input.').then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: time, max: 1, errors: ['time'] })
                .then(messages => {
                    message.channel.send(`You've entered: ${messages.first().content}`);
                })
                .catch(() => {
                    message.channel.send('You did not enter any input!');
                });
        });
    }

    public async awaitReaction(
        message: Message,
        filter: CollectorFilter,
        options?: AwaitReactionsOptions): Promise<Collection<string, MessageReaction>> {
        return message.awaitReactions(filter, options);
    }
}