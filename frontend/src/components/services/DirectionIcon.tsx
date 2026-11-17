import {
  AudioLines,
  BrainCircuit,
  Code2,
  MessageSquare,
  Server,
  Workflow,
} from "lucide-react";
import type { Direction } from "@/config/services";

const icons = {
  code: Code2,
  server: Server,
  brain: BrainCircuit,
  workflow: Workflow,
  message: MessageSquare,
  audio: AudioLines,
} as const;

export function DirectionIcon({ name, className = "size-[18px]" }: { name: Direction["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.6} aria-hidden />;
}
