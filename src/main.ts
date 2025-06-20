import { startREPL, IOstreams } from "./repl.js";

    const io: IOstreams = {
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex operational, awaiting input...",
    };

function main() {
    startREPL(io);
}

main();