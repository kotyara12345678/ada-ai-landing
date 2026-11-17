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
          background: "#101512",
          color: "#F4F7F5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: "1px solid rgba(32,201,130,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(32,201,130,0.08)",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 3, background: "#20C982" }} />
          </div>
          <div style={{ fontSize: 30, letterSpacing: -0.5 }}>{site.name}</div>
          <div style={{ fontSize: 16, color: "#9BAAA1", letterSpacing: 3, textTransform: "uppercase" }}>
            dev studio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -3, maxWidth: 900 }}>
            Ваши идеи. Наши технологии.
          </div>
          <div style={{ fontSize: 26, color: "#9BAAA1", maxWidth: 880, lineHeight: 1.4 }}>
            Сайты, программное обеспечение и AI-решения для бизнеса
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#9BAAA1" }}>
          <div>Web · Backend · AI · Automation</div>
          <div style={{ color: "#20C982", letterSpacing: 2 }}>от 5 000 RUB</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
