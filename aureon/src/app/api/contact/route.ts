import { promises as fs } from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MAX_LENGTH = { name: 120, email: 180, projectType: 80, budget: 80, message: 4000 };

type Payload = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  budget?: unknown;
  message?: unknown;
  company?: unknown;
};

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  // Honeypot: a real visitor never fills this hidden field.
  if (text(payload.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = text(payload.name, MAX_LENGTH.name);
  const email = text(payload.email, MAX_LENGTH.email);
  const projectType = text(payload.projectType, MAX_LENGTH.projectType);
  const budget = text(payload.budget, MAX_LENGTH.budget);
  const message = text(payload.message, MAX_LENGTH.message);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Please tell us your name." },
      { status: 422 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please use a valid email address." },
      { status: 422 },
    );
  }

  if (!projectType) {
    return NextResponse.json(
      { ok: false, message: "Please choose a project type." },
      { status: 422 },
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, message: "Please describe the project in a sentence or two." },
      { status: 422 },
    );
  }

  const submission = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    projectType,
    budget: budget || null,
    message,
  };

  try {
    const directory = path.join(process.cwd(), ".data");
    await fs.mkdir(directory, { recursive: true });
    await fs.appendFile(
      path.join(directory, "contact-submissions.jsonl"),
      `${JSON.stringify(submission)}\n`,
      "utf8",
    );
  } catch (error) {
    console.error("[contact] could not persist submission", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "The enquiry could not be saved right now. Please email the studio directly.",
      },
      { status: 500 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: [
            "New AUREON enquiry",
            `Name: ${name}`,
            `Email: ${email}`,
            `Type: ${projectType}`,
            `Budget: ${budget || "—"}`,
            "",
            message,
          ].join("\n"),
        }),
      });
    } catch (error) {
      // The submission is stored; a failed notification must not fail the form.
      console.error("[contact] telegram notification failed", error);
    }
  }

  return NextResponse.json({ ok: true });
}
