import chalk, { colors } from "chalk"
import { select , isCancel } from "@clack/prompts";
import {runAgentMode} from "./agent/orchestrator"
import { runAskMode } from "./ask/orchestrator";
// import { runWakeup } from "./tui/wakeup";
import { runPlanMode } from "./plan/orchestrator";

export  async function runCliMode() {
    while(true){
        const mode = await select({
            message:"Choose CLI sub-mode",
            options:[
                {value:"agent" , label:"Agent Mode"},
                {value:"plan" , label:"Plan Mode"},
                {value:"ask" , label:"Ask Mode"},
                {value:"back" , label:"← back to main menu"}
            ]
        });
        if(isCancel(mode) || mode === "back"){//if user cancel exit the process
            // console.log(chalk.dim("\n back \n"));
            return;
        }

        if(mode==="agent"){
           await runAgentMode(); 
        }

        if(mode==="plan"){
            await runPlanMode();
        }
        
        if(mode==="ask"){
            await runAskMode();
        } 

        if(mode !== "agent" && mode !== "ask" && mode !=="plan"){
            console.log(chalk.yellow("\n That mode is not implemented yet. \n"));
        }

    }

}

