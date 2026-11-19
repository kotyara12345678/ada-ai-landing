import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2563EB",
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            A
          </div>
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
