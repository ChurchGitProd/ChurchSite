import React from 'react';

export default function BooksSidebar() {
  return (
    <aside className="lg:col-span-4 space-y-8">
      {/* Featured Quote */}
      <div className="bg-secondary text-secondary-foreground p-6 rounded-xl space-y-4 shadow-sm">
        <span className="text-2xl text-tertiary block">🔖</span>
        <p className="text-xs italic leading-relaxed">
          &ldquo;A book is a garden, an orchard, a storehouse, a party, a company by the way, a counselor, a multitude of counselors.&rdquo;
        </p>
        <span className="block text-[10px] font-bold text-tertiary uppercase tracking-widest">
          — Charles Kingsley
        </span>
      </div>
    </aside>
  );
}
