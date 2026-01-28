/**
 * Generic Hook for Fetching Airtable Records
 * 
 * This hook provides a reusable interface for fetching records from any
 * Airtable table with built-in caching, loading states, and error handling.
 */

import { useState, useEffect, useCallback } from 'react';
import { getTable } from '../services/airtable/client';
import type { AirtableRecord } from '../services/airtable/types';
import { AirtableError } from '../services/airtable/types';
import { cacheService, CacheService } from '../services/cache/cacheService';

interface UseAirtableRecordsResult<T> {
  data: AirtableRecord<T>[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Generic hook for fetching Airtable records
 * 
 * @template T - Type of the record fields
 * @param tableName - Name of the Airtable table
 * @param filterFormula - Optional Airtable filter formula
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * ```typescript
 * const { data, loading, error, refetch } = useAirtableRecords<CandidatesFields>(
 *   'candidates',
 *   "{Status} = 'Active'"
 * );
 * ```
 */
export const useAirtableRecords = <T = any>(
  tableName: string,
  filterFormula?: string
): UseAirtableRecordsResult<T> => {
  const [data, setData] = useState<AirtableRecord<T>[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Generate cache key
      const cacheKey = CacheService.generateKey(tableName, filterFormula);

      // Check cache first
      const cachedData = cacheService.get<AirtableRecord<T>[]>(cacheKey);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Fetch from Airtable
      const table = getTable(tableName);
      const records: AirtableRecord<T>[] = [];

      const query = filterFormula 
        ? table.select({ filterByFormula: filterFormula })
        : table.select();

      await query.eachPage((pageRecords, fetchNextPage) => {
        pageRecords.forEach((record) => {
          // Note: createdTime access uses internal _rawJson property
          // This is a known limitation of the Airtable.js library
          records.push({
            id: record.id,
            fields: record.fields as T,
            createdTime: (record as any)._rawJson?.createdTime || new Date().toISOString(),
          });
        });
        fetchNextPage();
      });

      // Cache the results
      cacheService.set(cacheKey, records);

      setData(records);
    } catch (err) {
      const airtableError = new AirtableError(
        err instanceof Error ? err.message : 'Failed to fetch records',
        undefined,
        err instanceof Error ? err : undefined
      );
      setError(airtableError);
    } finally {
      setLoading(false);
    }
  }, [tableName, filterFormula]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    data,
    loading,
    error,
    refetch: fetchRecords,
  };
};
