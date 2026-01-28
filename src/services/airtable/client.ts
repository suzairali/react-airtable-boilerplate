/**
 * Airtable Client Configuration
 * 
 * Initializes and exports the configured Airtable client using
 * Personal Access Token (PAT) authentication.
 */

import Airtable from 'airtable';
import { getAirtableCredentials } from '../../config/airtable.config';

let airtableClient: Airtable | null = null;
let airtableBase: ReturnType<Airtable['base']> | null = null;

/**
 * Initialize and get the Airtable client
 * Lazy initialization - only creates client when first accessed
 * 
 * @returns Configured Airtable client instance
 * @throws Error if credentials are missing
 */
export const getAirtableClient = (): Airtable => {
  if (!airtableClient) {
    const { pat } = getAirtableCredentials();
    airtableClient = new Airtable({ apiKey: pat });
  }
  return airtableClient;
};

/**
 * Get the configured Airtable base
 * 
 * @returns Airtable base instance
 * @throws Error if credentials are missing
 */
export const getAirtableBase = () => {
  if (!airtableBase) {
    const { baseId } = getAirtableCredentials();
    const client = getAirtableClient();
    airtableBase = client.base(baseId);
  }
  return airtableBase;
};

/**
 * Get a specific table from the base
 * 
 * @param tableName - Name of the table to access
 * @returns Airtable table instance
 */
export const getTable = (tableName: string) => {
  const base = getAirtableBase();
  return base(tableName);
};
