import chalk from "chalk";
import { register } from "node:module";
import { Telegraf } from "telegraf";
import { WELCOME } from "./constants";
import { registerHandlers } from "./handlers";
// import { select , isCancel } from "@clack/prompts";

export async function runTelegramMode() {
    // when we are accese so i need Two thinks 
    // 1 - bot token 
    // 2 - owner ID

    const token = process.env.TELEGRAM_BOT_TOKEN;//both are remaing of telegram ban aftyer 22nd jun (3:30 in video)
    const ownerId = process.env.TELEGRAM_OWNER_ID;

    const bot = new Telegraf(token!);
    registerHandlers(bot)

    await bot.telegram.sendMessage(ownerId!, WELCOME, { parse_mode: 'Markdown' })

    console.log(chalk.green("Sent welcome message to Telegram.\n"));

    bot.launch();
    console.log(chalk.green("Telegram bot is running. Press Ctrl+C to stop.\n"));

    await new Promise<void>((resolve) => {
        const stop = () => {//stop method
            bot.stop("SIGINT");
            resolve();
        };
        process.once("SIGINT", stop);
        process.once("SIGTERM", stop);
    });



}