import styles from "./Card.module.scss";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  available?: boolean;
};

export default function Card({ className, available, ...props }: CardProps) {
  return (
    <div
      className={`${styles.card} ${className || ""} ${available ? styles.available : styles.locked}`}
      {...props}
    />
  );
}
