import { Manifesto } from "@/components/sections/Manifesto";
import { SystemSpecs } from "@/components/sections/SystemSpecs";

export const metadata = { title: "Manifesto // HUGO_LEONARDO" };

export default function AboutPage() {
  return (
    <>
      <Manifesto />
      <SystemSpecs />
    </>
  );
}