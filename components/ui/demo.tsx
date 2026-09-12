import { WordsStagger } from "@/components/ui/words-stagger";

export default function WordsStaggerDemo() {
  return (
    <div className="flex min-h-[360px] w-full items-center justify-center bg-background px-8 py-16">
      <WordsStagger className="max-w-xl text-3xl font-semibold leading-snug tracking-tight text-foreground">
        Spell UI is an open source collection of elegant, user friendly
        components that seamlessly integrate with frameworks and AI models.
      </WordsStagger>
    </div>
  );
}
