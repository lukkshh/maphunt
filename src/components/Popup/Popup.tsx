import Card from "../Card/Card";
import styles from "./Popup.module.scss";

type PopupProps = React.HTMLAttributes<HTMLDivElement>;

export default function Popup({
  children,
  className,
  ...props
}: PopupProps & { children: React.ReactNode; className?: string }) {
  return (
    <div className={styles.container} {...props}>
      <div className={`${styles.cardWrapper} `}>
        <Card className={`${className}`} available={true}>
          {children}
        </Card>
      </div>
    </div>
  );
}
