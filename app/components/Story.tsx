import ScrollReveal from './ScrollReveal';
import styles from './Story.module.css';

export default function Story() {
  return (
    <section className="border-t border-[#111111]/15 py-8 md:py-12">
      <div className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#111111]/55">
        Story
      </div>

      <ScrollReveal
        enableBlur
        baseOpacity={0.18}
        baseRotation={0}
        blurStrength={18}
        containerClassName={styles['story-reveal']}
        textClassName={styles['story-text']}
        wordAnimationEnd="bottom 35%"
      >
        This is not just a hackathon - it is a place where the known rules defy themselves, boundaries collapse, and pure potential takes over. It is a convergence of builders, dreamers, and relentless problem-solvers gathered to celebrate the art of creation, shatter limits, and pull real-world impact into existence for a cause that matters.
      </ScrollReveal>
    </section>
  );
}
