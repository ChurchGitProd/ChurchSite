import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

export const SUGGESTED_LANGUAGES = [
  'Nepali',
  'Kannada',
  'English',
  'Tamil',
  'Telugu',
  'Hindi',
  'Malayalam',
] as const;

/**
 * Custom TinaCMS field component for Video Language.
 * Provides suggestions for common ministry languages while allowing
 * editors to freely type any language they want.
 */
export const LanguageField = wrapFieldsWithMeta((props: any) => {
  const { input } = props;

  return (
    <div style={{ width: '100%' }}>
      <input
        type="text"
        list="tina-languages-datalist"
        id={input.name}
        name={input.name}
        value={input.value || ''}
        onChange={input.onChange}
        onBlur={input.onBlur}
        placeholder="Select suggestion or type any language..."
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '14px',
          borderRadius: '6px',
          border: '1px solid #cbd5e1',
          outline: 'none',
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        }}
      />
      <datalist id="tina-languages-datalist">
        {SUGGESTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang} />
        ))}
      </datalist>
      <div style={{ marginTop: '6px', fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
        Choose a suggested language or type any custom language name (e.g. Nepali, Kannada, etc.).
      </div>
    </div>
  );
});

export default LanguageField;
