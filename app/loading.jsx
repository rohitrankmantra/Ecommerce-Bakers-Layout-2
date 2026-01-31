export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gold/30" />
          <div className="absolute inset-0 rounded-full border-4 border-gold border-t-transparent animate-spin" />
        </div>
        <p className="font-serif text-primary text-lg">Baking your experience…</p>
        <p className="text-muted-foreground text-sm">Fresh, warm, and ready soon</p>
      </div>
    </div>
  )
}
