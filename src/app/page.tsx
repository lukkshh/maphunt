import HomeSection from "@/components/organisms/HomeSection/HomeSection";
import styles from "./page.module.scss";

export default function Page() {
  return (
    <section className={styles.container}>
      <HomeSection />
    </section>
  );
}
