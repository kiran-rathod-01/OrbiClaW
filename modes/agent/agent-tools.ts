import {tool} from "ai";
import {z} from "zod";
import type { ToolExecutor } from "./tool-executor";
import { read } from "node:fs";
import { path } from "@clack/prompts";
import { exitCode } from "node:process";

export function createAgentTools(executor:ToolExecutor){
    return {// this is mnaking a tool to use tool-executeor to do ther task 
        read_file : tool({//this is read tool
            description:"Read a text file from the workspace . Use a path relative to the project root.",
            inputSchema:z.object({
                path:z.string().describe("Relative file path")
            }),
            execute:async({path:p})=>executor.readfile(p)
        }),

        create_file : tool({//this is create tool
            description:"Stage Creaton of a new file (not written until the user approves).",
            inputSchema:z.object({
                path:z.string(),//kaha likna hai
                content:z.string(),//Aur kya likhna hai
            }),
            execute: async({path:p,content})=>executor.createFile(p,content),
        }),

        modify_file : tool({
            description:"Stage a full-file replacement for an existing file (pending approval).",
            inputSchema:z.object({
                path: z.string(),
                content:z.string().describe('Complete new file contents'),                
            }),
            execute: async ({ path:p, content})=> executor.modifyFile(p,content),
        }),

    };
}
