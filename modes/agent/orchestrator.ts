import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types.ts"
import { types } from "node:util";
import { ActionTracker } from "./action-tracker.ts";
 import { ToolExecutor } from "./tool-executor.ts";
 

export async function runAgentMode() {
    
    console.log(chalk.bold("\n🤖 Agent Mode"));

    const goal = await text({
        message: "What would you like the agent to do ",
        placeholder: "Concrete task for this codebase...",
    });

    if(isCancel(goal) || !goal.trim())return ;

    const config = defaultAgentConfig()
    const tracker = new ActionTracker();
    const executor = new ToolExecutor(tracker,config)
    const tools = createAgentTools(executor)

}