const farben: Record<string, string> = {
  gruen: "bg-green-500",
  gelb: "bg-yellow-400",
  rot: "bg-red-500",
};

export function AmpelPunkt({ ampel }: { ampel: string }) {
  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ${farben[ampel] ?? "bg-slate-300"}`}
      aria-hidden="true"
    />
  );
}
