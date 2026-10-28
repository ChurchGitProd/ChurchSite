'use client';

import { useState, FormEvent } from 'react';
import { Mail, Info } from 'lucide-react';

interface NewsletterData {
  title?: string | null;
  description?: string | null;
  buttonText?: string | null;
}

interface DailyEpistleCardProps {
  data?: NewsletterData | null;
}

export default function DailyEpistleCard({ data }: DailyEpistleCardProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = data?.title || 'The Daily Epistle';
  const description =
    data?.description ||
    'Receive a scholarly, editorial commentary, cross-references, and historical background directly to your inbox every morning. Free from fluff, focused entirely on the scripture text.';
  const buttonText = data?.buttonText || 'Subscribe to Epistle';

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="bg-primary text-primary-foreground p-6 rounded-xl space-y-4 shadow-lg border border-primary/20">
      <div className="w-10 h-10 rounded-lg bg-tertiary/20 flex items-center justify-center text-tertiary">
        <Mail className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-heading font-bold">{title}</h3>
      <p className="text-xs text-primary-foreground/80 leading-relaxed">
        {description}
      </p>

      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="p-3.5 bg-tertiary/20 border border-tertiary/40 rounded-lg text-xs space-y-2 text-tertiary animate-fadeIn"
        >
          <div className="flex items-center gap-1.5 font-bold">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>Editorial Preview Notice</span>
          </div>
          <p className="text-[11px] text-primary-foreground/85 leading-relaxed">
            Thank you for your interest. Automated email dispatch is in editorial preview mode and not connected to an external mailing list. For study inquiries, contact us directly at{' '}
            <a href="mailto:contact@scriptura.org" className="underline font-semibold hover:text-white">
              contact@scriptura.org
            </a>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setEmail('');
            }}
            className="text-[10px] text-primary-foreground/70 hover:underline pt-1 block"
          >
            ← Enter another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 pt-2" noValidate>
          <label htmlFor="daily-epistle-email" className="sr-only">
            Email address for {title}
          </label>
          <input
            id="daily-epistle-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Your email address"
            className="w-full px-3 py-2.5 text-xs rounded bg-white text-[#1f2937] placeholder:text-[#6b7280] border border-border/20 focus:outline-none focus:ring-1 focus:ring-tertiary"
            required
            aria-required="true"
          />
          {error && (
            <p role="alert" className="text-[11px] text-red-300 font-medium">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 bg-tertiary text-primary font-bold text-xs rounded hover:bg-tertiary/90 transition-all uppercase tracking-wider"
          >
            {buttonText}
          </button>
        </form>
      )}
    </div>
  );
}
