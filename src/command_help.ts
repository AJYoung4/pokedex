import { CLICommand } from "./command.js"

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!\n");
    console.log("Usage:\n");
    for (const key in commands) {
        const cmd = commands[key];
        console.log(`${cmd.name}: ${cmd.description}`);
    }
}