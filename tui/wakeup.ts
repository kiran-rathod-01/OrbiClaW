import { select , isCancel } from "@clack/prompts";
import chalk, { colors } from "chalk"
import figlet from "figlet";
import { kMaxLength } from "node:buffer";
import { log } from "node:console";
import { runCliMode  } from "../modes/cli";
import { runTelegramMode  } from "../modes/telegram";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#5b4d9e');
const FACE =    chalk.hex('#e8dcf8').bold; 


function printBannerwithshadow(ascii: string) { // this is for showing the Big size Logo Name

    const bannerLines = ascii.replace(/\s+$/,'').split('\n');
    const maxLen = Math.max(...bannerLines.map((l) => l.length),0);
    const rowWidth = maxLen +2;

    for (const line of bannerLines){
        console.log(SHADOW(('   '+line).padEnd(rowWidth)));
    }
    process.stdout.write(`\x1b[${bannerLines.length}A`);
    for (const line of bannerLines) {
        console.log(FACE(line.padEnd(rowWidth)));
    }
    console.log();
}

export async function runWakeup() {
    let ascii:string;

    try{
        ascii =figlet.textSync("orbiclaw" , {font:BANNER_FONT})
    }catch(error){
        ascii = figlet.textSync("orbiclaw" , {font:"standerd"})
    }
    printBannerwithshadow(ascii)

    const mode = await select({//this is for show after my logo name which mode you select
        message:"Which mode you want to processed with?",
        options:[
            {value:"cli" , label:"CLI"},
            {value:"telegram" , label:"Telegram"},
            {value:"exit" , label:"Exit"}
        ]
    });

        if(isCancel(mode) || mode === "exit"){//if user cancel exit the process
            console.log(chalk.dim("\n Goodbuy \n"));
            return;
        }

        if(mode === "cli"){
            await runCliMode();
        } 

        if(mode === "telegram"){
            await runTelegramMode();
        }
}