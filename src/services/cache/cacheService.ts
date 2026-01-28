/**
 * Simple In-Memory Caching Service
 * 
 * Provides a basic caching layer for Airtable records with TTL support.
 * Cache entries automatically expire after the specified time-to-live.
 */

import { AIRTABLE_CONFIG } from '../../config/airtable.config';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class CacheService {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Get a value from the cache
   * 
   * @param key - Cache key
   * @returns Cached value or null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  /**
   * Set a value in the cache
   * 
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Time-to-live in milliseconds (default: AIRTABLE_CONFIG.CACHE_TTL)
   */
  set<T>(key: string, value: T, ttl: number = AIRTABLE_CONFIG.CACHE_TTL): void {
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, { value, expiresAt });
  }

  /**
   * Check if a key exists in the cache and is not expired
   * 
   * @param key - Cache key
   * @returns true if key exists and is valid, false otherwise
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Invalidate (remove) a specific cache entry
   * 
   * @param key - Cache key to invalidate
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Generate a cache key from table name and filter
   * 
   * @param tableName - Name of the table
   * @param filterFormula - Optional filter formula
   * @returns Cache key string
   */
  static generateKey(tableName: string, filterFormula?: string): string {
    return filterFormula 
      ? `${tableName}:${filterFormula}` 
      : tableName;
  }

  /**
   * Get cache statistics
   * 
   * @returns Object with cache size (total entries including expired)
   */
  getStats(): { size: number } {
    // Clean up expired entries before calculating stats
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }

    return {
      size: this.cache.size,
    };
  }
}

// Export singleton instance and class
export const cacheService = new CacheService();
export { CacheService };
