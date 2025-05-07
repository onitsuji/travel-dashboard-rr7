import { calculateTrendPercentage, cn } from "lib/utils";

export default function StatsCard({
  headerTitle,
  total,
  currentMonthCount,
  lastMonthCount,
}: StatsCard) {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );

  const isDecrease = trend === "decrement";

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>
      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              {isDecrease ? (
                <img
                  src="/assets/icons/arrow-down-red.svg"
                  className="size-5"
                />
              ) : (
                <img
                  src="/assets/icons/arrow-up-green.svg"
                  className="size-5"
                />
              )}
              <figcaption
                className={cn(
                  "text-sm font-medium",
                  isDecrease ? "text-red-500" : "text-success-700"
                )}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="text-sm text-gray-100 font-medium truncate">
              vs last month
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
