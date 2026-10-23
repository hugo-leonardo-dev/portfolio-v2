import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 text-center">
      <div className="text-danger text-6xl neon-red glitch">404</div>
      <p className="mt-4 text-muted tracking-widest">[DATA ERROR] // ROUTE NOT FOUND</p>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">[ RETURN_HOME ]</Link>
    </section>
  );
}