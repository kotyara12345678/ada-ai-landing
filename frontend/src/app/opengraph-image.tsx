import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function iconDataUrl(): string | null {
  try {
    const file = path.join(process.cwd(), "public", "brand", "icon-128.png");
    return `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}

export default function OpengraphImage() {
  const icon = iconDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FFFFFF",
          color: "#17212F",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {icon ? (
            <img src={icon} width={52} height={52} style={{ borderRadius: 12 }} alt="" />
          ) : (
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#16A34A",
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              A
            </div>
          )}
          <div style={{ fontSize: 30, letterSpacing: -0.5, fontWeight: 600 }}>{site.name}</div>
          <div style={{ fontSize: 15, color: "#657184", letterSpacing: 2, textTransform: "uppercase" }}>
            разработка и обслуживание
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.1, letterSpacing: -2.5, maxWidth: 960 }}>
            Разрабатываем, запускаем и обслуживаем цифровые решения
          </div>
          <div style={{ fontSize: 25, color: "#657184", maxWidth: 900, lineHeight: 1.4 }}>
            Сайты, backend, AI и автоматизация. Техническое обслуживание IT-продуктов.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#657184",
            borderTop: "1px solid #E4E8EF",
            paddingTop: 22,
          }}
        >
          <div>Web · Backend · AI · Managed IT Services</div>
          <div style={{ color: "#2563EB", fontWeight: 600 }}>обслуживание от 1 490 руб./мес.</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
