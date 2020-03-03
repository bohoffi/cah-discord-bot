export interface MessageParseResult {
  _: string[];
  [key: string]: any;
}

export interface CommanderOptions {
  prefix: string;
  debug?: boolean;
}
