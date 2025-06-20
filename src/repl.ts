import * as readline from "node:readline";

// Interface Definition
export interface IOstreams {
    input: NodeJS.ReadableStream;
    output: NodeJS.WritableStream;
    prompt: string;
};

// cleanInput
export function cleanInput(input: string): string[] {
    return input.trim().toLowerCase().split(" ").filter((word) => word !== "");
};


// startREPL
export function startREPL(io: IOstreams): void {
    const rl = readline.createInterface({
        input: io.input,
        output: io.output,
        prompt: io.prompt,
    });

    rl.prompt();

    rl.on("line", (line: string) => {
        const words = cleanInput(line);
        if (words.length === 0 || words [0] === "") {
            rl.prompt();
            return;
        }

        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    });
}