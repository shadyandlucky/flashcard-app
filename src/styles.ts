/**
 * Shared inline style objects for consistent layout and buttons across pages.
 * Keeps visual behavior identical while avoiding duplication.
 */
import type { CSSProperties } from 'react';

export const pageMain: CSSProperties = {
  padding: '2rem',
  maxWidth: '32rem',
  margin: '0 auto',
};

export const pageMainNarrow: CSSProperties = {
  ...pageMain,
  maxWidth: '28rem',
};

export const heading: CSSProperties = {
  marginBottom: '0.5rem',
};

export const subtext: CSSProperties = {
  color: '#888',
  marginBottom: '2rem',
};

export const subtextSmall: CSSProperties = {
  color: '#888',
  marginBottom: '1rem',
};

export const navColumn: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

export const navColumnTight: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
};

/** Neutral button-style link (e.g. category buttons, "Study another category"). */
export const buttonLink: CSSProperties = {
  display: 'block',
  padding: '1rem 1.5rem',
  background: '#374151',
  color: 'white',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 600,
  textAlign: 'center',
};

export const buttonLinkStudy: CSSProperties = { ...buttonLink, background: '#3b82f6' };
export const buttonLinkQuiz: CSSProperties = { ...buttonLink, background: '#db2777' };
export const buttonLinkStats: CSSProperties = { ...buttonLink, background: '#059669' };

export const buttonLinkSmall: CSSProperties = {
  ...buttonLink,
  padding: '0.75rem 1.25rem',
};

export const linkSecondary: CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'underline',
};

/** Spacer above a block (e.g. back link section). */
export const topSpacer: CSSProperties = {
  marginTop: '2rem',
};

/** Subtext with reduced bottom margin for session complete message. */
export const subtextTight: CSSProperties = {
  ...subtext,
  marginBottom: '1.5rem',
};
