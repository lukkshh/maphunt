import styles from "./Badge.module.scss";

type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

export default function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
