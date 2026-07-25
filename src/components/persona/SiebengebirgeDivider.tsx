interface SiebengebirgeDividerProps {
  className?: string;
}

/**
 * Schlichte Strichzeichnung der Siebengebirge-Silhouette mit dem
 * Drachenfels als markantester Erhebung. Rein dekorativ, daher aria-hidden.
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
        points="0,200 90,150 170,175 260,130 350,165 430,95 460,113 520,150 610,120 700,160 790,130 880,170 970,145 1060,180 1150,160 1200,200"
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
