import React from 'react';
import { sanitizeDocumentUrl } from '@/lib/media';

interface DownloadButtonProps {
  url?: string;
  file?: string;
  filename?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  disabledTooltip?: string;
  ariaLabel?: string;
  title?: string;
}

export default function DownloadButton({
  url,
  file,
  filename,
  children,
  className = '',
  disabled = false,
  disabledTooltip = 'Document currently unavailable',
  ariaLabel,
  title,
}: DownloadButtonProps) {
  const rawTarget = file || url || '';
  const sanitizedTarget = sanitizeDocumentUrl(rawTarget);
  const isUnavailable = disabled || (!url && !file) || !sanitizedTarget;

  if (isUnavailable) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label={ariaLabel}
        title={title || disabledTooltip}
        className={`${className} opacity-60 cursor-not-allowed`}
      >
        {children}
      </button>
    );
  }

  // Determine effective target
  const isLocalPath =
    sanitizedTarget.startsWith('/') ||
    sanitizedTarget.startsWith('uploads/') ||
    sanitizedTarget.startsWith('documents/');

  let downloadHref: string;
  if (isLocalPath) {
    // Direct static CDN link ensures large files (up to 100MB+) download reliably without serverless function limits
    downloadHref = sanitizedTarget.startsWith('/') ? sanitizedTarget : `/${sanitizedTarget}`;
  } else {
    const queryParams = new URLSearchParams();
    if (url) queryParams.set('url', url);
    if (file) queryParams.set('file', file);
    if (filename) queryParams.set('filename', filename);
    downloadHref = `/api/download?${queryParams.toString()}`;
  }

  return (
    <a
      href={downloadHref}
      download={filename || true}
      aria-label={ariaLabel}
      title={title}
      className={className}
    >
      {children}
    </a>
  );
}
