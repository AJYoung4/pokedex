import { rawListeners } from "node:process";
import * as readline from "node:readline";
import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { CLICommand } from "./command.js"

//Commands registry
export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
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

        if(!command) {
            console.log(
                `Unknown command: "${commandName}". Type "help" for a list of commands.`,
            );
            rl.prompt();
            return;
        }

        try {
            command.callback(commands);
        } catch (e) {
            console.log(e);
        }

        rl.prompt();
    });
}