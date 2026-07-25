interface SiebengebirgeDividerProps {
  className?: string;
}

/**
 * Strichzeichnung der Siebengebirge-Silhouette mit dem Drachenfels als
 * klar erkennbare Bergkuppe samt schlanker Turmruine. Rein dekorativ,
 * daher aria-hidden.
 */
export function SiebengebirgeDivider({ className }: SiebengebirgeDividerProps) {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <polyline
        points="0,198 100,165 190,180 280,140 360,165 430,120 480,140 520,95 545,68 552,68 552,30 560,30 560,42 568,42 568,18 576,18 576,68 600,95 650,150 720,115 800,155 880,130 960,165 1040,140 1120,175 1200,198"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
