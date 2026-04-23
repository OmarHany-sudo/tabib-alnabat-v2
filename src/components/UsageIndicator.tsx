interface UsageIndicatorProps {
  remaining: number;
  total: number;
}

export default function UsageIndicator({
  remaining,
  total,
}: UsageIndicatorProps) {
  const used = total - remaining;

  return (
    <div className="bg-sage/50 rounded-xl px-4 py-2.5 flex items-center gap-3">
      <span className="text-sm text-medium-gray font-medium">
        باقي ليك {remaining} من {total} تشخيص اليوم
      </span>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < used ? "bg-olive" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
