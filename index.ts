#!/usr/bin/env bun  

// import { log } from "@clack/prompts";
import { Command } from "commander";// provide CLI interface 
import { isAwaitExpression } from "typescript";
import { runWakeup } from "./tui/wakeup";

const program = new Command();

program.name("orbiclaw")//name of my claw 
    .description("orbi cli for personal use")
    .version("0.0.1");    


program.command("wakeup")
    .description("Show the banner and pick cli or telegram mode")
    .action(
        async()=>{
            await runWakeup()
        }
    );

    await program.parseAsync(process.argv)
