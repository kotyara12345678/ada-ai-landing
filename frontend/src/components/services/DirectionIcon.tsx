import {
  AudioLines,
  BrainCircuit,
  Code2,
  Database,
  Headset,
  MessageSquare,
  Server,
  ServerCog,
  Workflow,
  Wrench,
} from "lucide-react";
import type { Direction } from "@/config/services";

const icons = {
  code: Code2,
  server: Server,
  brain: BrainCircuit,
  workflow: Workflow,
  message: MessageSquare,
  audio: AudioLines,
  wrench: Wrench,
  serverCog: ServerCog,
  database: Database,
  headset: Headset,
} as const;

export function DirectionIcon({
  name,
  className = "size-5",
}: {
  name: Direction["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} strokeWidth={1.7} aria-hidden />;
}
