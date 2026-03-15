import type { CSSProperties, HTMLAttributes } from "react";

import styles from "./Card.module.scss";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  available?: boolean;
  coverImage?: string;
  coverLabel?: string;
};

export default function Card({
  children,
  className,
  available = true,
  coverImage,
  coverLabel,
  style,
  ...props
}: CardProps) {
  const coverStyle = coverImage
    ? ({
        "--card-cover-image": `url("${coverImage}")`,
      } as CSSProperties)
    : undefined;

  const mergedStyle = coverStyle ? { ...style, ...coverStyle } : style;

  return (
    <div
      className={`${styles.card} ${className || ""} ${available ? styles.available : styles.locked} ${coverImage ? styles.withCover : ""}`}
      style={mergedStyle}
      {...props}
    >
      {coverImage && (
        <div
          className={styles.cover}
          role="img"
          aria-label={coverLabel || "Game cover image"}
        />
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
