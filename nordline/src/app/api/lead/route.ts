import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

const asText = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Некорректный запрос." }, { status: 400 });
  }

  // Honeypot: скрытое поле заполняют только боты.
  if (asText(body.company_website, 200)) {
    return Response.json({ ok: true });
  }

  const name = asText(body.name, 120);
  const company = asText(body.company, 160);
  const contact = asText(body.contact, 160);
  const direction = asText(body.direction, 160);
  const comment = asText(body.comment, 1000);

  if (name.length < 2 || company.length < 2 || contact.length < 5 || !direction) {
    return Response.json({ error: "Заполнены не все обязательные поля." }, { status: 422 });
  }

  const record = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name,
    company,
    contact,
    direction,
    comment,
    source: asText(body.source, 80) || "nordline-landing",
  };

  try {
    const dataDir = path.join(process.cwd(), ".data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(path.join(dataDir, "leads.jsonl"), `${JSON.stringify(record)}\n`, "utf8");
  } catch (error) {
    console.error("[nordline] lead storage failed", error);
    return Response.json({ error: "Не удалось сохранить заявку." }, { status: 500 });
  }

  return Response.json({ ok: true, id: record.id });
}
