import type { Metadata } from "next";
import ServiceView from "./ServiceView";

export const metadata: Metadata = {
  title: "Service Client",
  description: "Delivery, returns, engraving and gifting, and how to reach the Vespre concierge.",
};

export default function ServicePage() {
  return <ServiceView />;
}
