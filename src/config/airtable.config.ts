/**
 * Airtable Configuration
 * 
 * Centralized configuration for Airtable integration including
 * cache settings and table names.
 */

export const AIRTABLE_CONFIG = {
  /**
   * Cache Time-To-Live in milliseconds
   * Default: 60000 (1 minute)
   */
  CACHE_TTL: 60000,
  
  /**
   * Table names in the Airtable base
   * Add new tables here as they are added to your base
   */
  TABLES: {
    CANDIDATES: 'candidates',
    // Add more tables here as needed
    // JOBS: 'jobs',
    // APPLICATIONS: 'applications',
  },
} as const;

/**
 * Environment variables with validation
 */
export const getAirtableCredentials = () => {
  const pat = import.meta.env.VITE_AIRTABLE_PAT;
  const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

  if (!pat || !baseId) {
    throw new Error(
      'Missing Airtable credentials. Please ensure VITE_AIRTABLE_PAT and VITE_AIRTABLE_BASE_ID are set in your .env file.'
    );
  }

  return { pat, baseId };
};
