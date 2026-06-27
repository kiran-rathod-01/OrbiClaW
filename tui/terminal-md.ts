import {marked} from "marked";
import {markedTerminal} from "marked-terminal";


let ready = false;

function ensureMarked(): void {
  if (ready) return;
  const w = Math.max(40, Math.min(process.stdout.columns || 80, 120));
  // marked-terminal returns a TerminalRenderer which isn't directly compatible
  // with marked.use's type in some TypeScript setups. Cast to any to avoid
  // the type error while preserving runtime behavior.
  marked.use(markedTerminal({ width: w, reflowText: true }) as any);
  ready = true;
}

export function renderTerminalMarkdown(source: string): string {
    ensureMarked();
  return marked.parse(source.trimEnd(), { async: false });
}