import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Kitchen } from "@/components/sections/kitchen";
import { Menu } from "@/components/sections/menu";
import { Chef } from "@/components/sections/chef";
import { Room } from "@/components/sections/room";
import { Booking } from "@/components/sections/booking";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "OLEA — ресторан на огне",
  description:
    "Ресторан средиземноморской кухни на открытом огне: сезонное меню, натуральное вино и бар на четырнадцать мест. Москва, Никитский бульвар, 7.",
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Kitchen />
      <Menu />
      <Chef />
      <Room />
      <Booking />
    </>
  );
}
