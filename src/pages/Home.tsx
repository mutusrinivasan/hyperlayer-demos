export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-hyperlayer-white px-6 text-hyperlayer-grey">
      <img src="/hyperlayer-logo.png" alt="Hyperlayer" className="h-10 w-auto" />

      <h1 className="text-3xl font-semibold text-hyperlayer-grey">Hyperlayer Bank</h1>

      <p className="text-base text-hyperlayer-text-secondary">Palette and theme check</p>

      <div className="flex gap-4">
        <div className="h-16 w-16 bg-jar-blue" />
        <div className="h-16 w-16 bg-jar-teal" />
        <div className="h-16 w-16 bg-jar-gold" />
      </div>

      <div className="h-12 w-full max-w-md bg-gradient-to-r from-hyperlayer-gradient-from to-hyperlayer-gradient-to" />
    </div>
  );
}
