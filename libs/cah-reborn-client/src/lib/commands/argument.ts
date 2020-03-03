export enum ArgumentType {
  String,
  Number,
  Boolean,
  Member
}

export interface ArgumentDefinition {
  name: string;
  description: string;
  type?: ArgumentType;
}

export interface Arguments {
  [key: string]: any;
  help?: boolean;
}

export interface BaseArgumentsType {
  help?: boolean;
}

export abstract class ArgumentTypeResolver<TArgumentType> {
  public abstract resolve(value: any): TArgumentType;
}
