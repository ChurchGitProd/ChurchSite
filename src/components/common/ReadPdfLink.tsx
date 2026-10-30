import React from 'react';
import { sanitizeDocumentUrl, isValidPdfUrl } from '@/lib/media';

interface ReadPdfLinkProps {
  pdfFile?: string | null;
  children: React.ReactNode;
  className?: string;
  unavailableTitle?: string;
}

export default function ReadPdfLink({
  pdfFile,
  children,
  className = '',
  unavailableTitle = 'Lesson PDF is not available yet',
}: ReadPdfLinkProps) {
  if (!isValidPdfUrl(pdfFile)) {
    return (
      <span
        aria-disabled="true"
        title={unavailableTitle}
        className={`${className} opacity-50 cursor-not-allowed no-underline hover:no-underline`}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={sanitizeDocumentUrl(pdfFile)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
