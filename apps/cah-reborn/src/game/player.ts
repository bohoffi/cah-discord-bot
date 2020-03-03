export class Player {
    constructor(private userId: string, public username: string, public points = 0, public czar = false, public hasPlayed = false) { }

    /**
     * Gets the users id.
     */
    public get id(): string {
        return this.userId;
    }

    /**
     * Gets a string for mentioning the player.
     */
    public get mention(): string {
        return `<@${this.userId}>`;
    }

    /**
     * Gets the players username and his/her points (+ czar)
     */
    public getPointsDisplay(withHasPlayedFlag = false): string {
        let display = `${this.username} - ${this.points}`;

        if (this.czar) {
            display += ' **Czar**';
        }
        if (withHasPlayedFlag && this.hasPlayed) {
            display += ' **Payled!**';
        }

        return display;
    }
}