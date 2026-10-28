'use client';

import { useState, FormEvent } from 'react';
import { Info } from 'lucide-react';

interface NewsletterStripData {
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
}

interface QuarterlyNewsletterStripProps {
  data?: NewsletterStripData | null;
}

export default function QuarterlyNewsletterStrip({ data }: QuarterlyNewsletterStripProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = data?.title || 'Subscribe to Scripture Quarterly';
  const description =
    data?.description ||
    'Get theological journals, research updates, and scripture study guides delivered quarterly.';
  const buttonText = data?.buttonText || 'Subscribe';

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="bg-secondary text-secondary-foreground py-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-heading font-bold text-tertiary">{title}</h3>
            <p className="text-xs text-secondary-foreground/80 leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3.5 bg-tertiary/20 border border-tertiary/40 rounded-lg text-xs text-tertiary animate-fadeIn max-w-lg"
            >
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5 sm:mt-0" />
              <div className="space-y-1">
                <span className="font-bold block">Editorial Preview Notice</span>
                <span className="text-[11px] text-secondary-foreground/85 leading-relaxed block">
                  Automated quarterly distribution is in preview mode and not connected to an external mail service. Reach out at{' '}
                  <a href="mailto:contact@scriptura.org" className="underline font-semibold hover:text-white">
                    contact@scriptura.org
                  </a>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                className="text-[10px] text-secondary-foreground/70 hover:underline sm:ml-auto whitespace-nowrap"
              >
                Reset
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row w-full md:w-auto max-w-md gap-2"
              noValidate
            >
              <div className="flex-1 space-y-1">
                <label htmlFor="quarterly-newsletter-email" className="sr-only">
                  Email address for {title}
                </label>
                <input
                  id="quarterly-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 text-xs rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-tertiary border border-border"
                  required
                  aria-required="true"
                />
                {error && (
                  <p role="alert" className="text-[11px] text-red-300 font-medium">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-bold text-xs rounded hover:bg-primary/95 transition-all uppercase tracking-wider whitespace-nowrap shadow-sm h-[38px]"
              >
                {buttonText}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
