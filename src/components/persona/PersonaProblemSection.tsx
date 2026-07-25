interface PersonaProblemSectionProps {
  points: string[];
  large?: boolean;
}

export function PersonaProblemSection({
  points,
  large,
}: PersonaProblemSectionProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-14">
      <div className={large ? "space-y-10" : "space-y-8"}>
        {points.map((point, i) => (
          <p
            key={i}
            className={`border-l-2 border-[#2F5D50] pl-6 text-[#23282A] ${large ? "text-2xl" : "text-lg"}`}
          >
            {point}
          </p>
        ))}
      </div>
    </section>
  );
}
