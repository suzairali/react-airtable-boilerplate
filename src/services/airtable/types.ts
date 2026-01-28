/**
 * Base TypeScript types for Airtable integration
 * 
 * These types provide the foundation for all Airtable operations
 * and are used by both generic and generated code.
 */

/**
 * Generic Airtable record structure
 * @template T - The type of the fields object
 */
export interface AirtableRecord<T = Record<string, any>> {
  id: string;
  fields: T;
  createdTime: string;
}

/**
 * Airtable attachment field type
 */
export interface Attachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?: { url: string; width: number; height: number };
  };
}

/**
 * Error types for Airtable operations
 */
export class AirtableError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AirtableError';
  }
}

export class AirtableNotFoundError extends AirtableError {
  constructor(message: string = 'Record not found') {
    super(message, 404);
    this.name = 'AirtableNotFoundError';
  }
}

export class AirtableAuthError extends AirtableError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
    this.name = 'AirtableAuthError';
  }
}

export class AirtableRateLimitError extends AirtableError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429);
    this.name = 'AirtableRateLimitError';
  }
}

/**
 * Filter options for querying records
 */
export interface QueryOptions {
  filterByFormula?: string;
  maxRecords?: number;
  pageSize?: number;
  sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
  view?: string;
}
