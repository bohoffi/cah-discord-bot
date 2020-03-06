import { Command, ArgumentDefinition } from '@cah-reborn-client';
import { Message } from 'discord.js';

export class WhatsnewCommand extends Command {
    public get aliases(): string[] {
        return [];
    }
    public get signature(): ArgumentDefinition[] {
        return [];
    }
    public run(message: Message, args: any): Promise<Message | Message[]> {
        throw new Error("Method not implemented.");
    }
}