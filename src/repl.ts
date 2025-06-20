import { rawListeners } from "node:process";
import * as readline from "node:readline";

// types
export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

//Commands registry
export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
    };
    // more commands here
}

// cleanInput
export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((word) => word !== "");
};

// startREPL
export function startREPL() {
    const commands = getCommands();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >>",
    });

    rl.prompt();

    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = words[0];
        const command = commands[commandName];

        if (command) {
            try {
                await command.callback(commands);
            } catch (error) {
                console.error(`Error running command "${commandName}":`, error);
            }
        } else {
            console.log(`Unknown command`)
        }

        rl.prompt();
    });
}

// command exit
export function commandExit() {
    console.log(`Closing the Pokedex... Goodbye!`);
    process.exit(0);
}