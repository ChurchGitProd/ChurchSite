interface AboutHeroProps {
  badge?: string | null;
  headline?: string | null;
  subheadline?: string | null;
}

export default function AboutHero({
  badge = 'Our Mandate',
  headline = 'Scholarly Devotion to the Sacred Texts',
  subheadline = 'Discover the foundational vision, academic rigor, and profound faith that drives Jesus Loves Ministry.',
}: AboutHeroProps) {
  return (
    <section className="relative py-16 bg-gradient-to-b from-muted/30 to-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-tertiary uppercase">
          {badge}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary">
          {headline}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
      </div>
    </section>
  );
}
