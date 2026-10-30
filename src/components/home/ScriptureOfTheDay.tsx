import { resolveDailyScripture, ScriptureOfTheDayData } from '@/lib/dailyScripture';

interface ScriptureOfTheDayProps {
  data?: ScriptureOfTheDayData | null;
}

export default function ScriptureOfTheDay({ data }: ScriptureOfTheDayProps) {
  const { verse, reference } = resolveDailyScripture(data);

  return (
    <section
      className="py-12 border-b border-border relative transition-colors duration-200"
      style={{ background: 'var(--blue-tint-4)' }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
          Scripture of the Day
        </span>
        <blockquote className="text-2xl sm:text-3xl font-heading italic text-primary leading-relaxed">
          &ldquo;{verse}&rdquo;
        </blockquote>
        <cite className="block text-sm font-sans font-semibold text-muted-foreground not-italic">
          {reference}
        </cite>
      </div>
    </section>
  );
}
