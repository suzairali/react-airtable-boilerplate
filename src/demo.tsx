/**
 * Demo Usage Example for Airtable Integration
 * 
 * This file demonstrates how to use the generated hooks and services.
 * Run 'npm run generate:schema' first to generate the required types and services.
 */

import { useEffect } from 'react';
// Uncomment these imports after running 'npm run generate:schema'
// import { useCandidates } from './hooks/generated/useCandidates';
// import { CandidatesService } from './services/airtable/generated/candidates.service';

/**
 * Demo Component - Using Generated Hook
 * 
 * This component demonstrates using the generated useCandidates hook
 * to fetch and display data from Airtable.
 */
export const DemoWithHook = () => {
  // Uncomment after running 'npm run generate:schema'
  // const { data, loading, error, refetch } = useCandidates();

  // Placeholder for demo purposes
  const data = null;
  const loading = false;
  const error = null;
  const refetch = () => console.log('Refetch called');

  if (loading) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Demo: Using Generated Hook</h2>
        <p>Loading candidates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Demo: Using Generated Hook</h2>
        <p style={{ color: 'red' }}>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Demo: Using Generated Hook</h2>
      <button onClick={refetch} style={{ marginBottom: '10px' }}>
        Refetch Data
      </button>
      {data && data.length > 0 ? (
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p>No data available. Make sure you've run 'npm run generate:schema' first.</p>
      )}
    </div>
  );
};

/**
 * Demo Component - Using Generated Service Directly
 * 
 * This component demonstrates using the generated CandidatesService
 * directly to fetch data from Airtable.
 */
export const DemoWithService = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('🔍 Fetching all candidates...');
        
        // Uncomment after running 'npm run generate:schema'
        // const allCandidates = await CandidatesService.getAll();
        // console.log('✅ All candidates:', allCandidates);

        // Example with filter
        // const activeCandidates = await CandidatesService.getByFilter("{Status} = 'Active'");
        // console.log('✅ Active candidates:', activeCandidates);

        // Example: Get by ID
        // const candidate = await CandidatesService.getById('rec123456');
        // console.log('✅ Single candidate:', candidate);

        console.log('⚠️  Service methods are commented out. Uncomment after running "npm run generate:schema"');
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Demo: Using Generated Service</h2>
      <p>Check the browser console for service usage examples.</p>
      <p style={{ color: '#666', fontSize: '14px' }}>
        Open DevTools Console to see the logged data.
      </p>
    </div>
  );
};

/**
 * Demo Component - Error Handling
 * 
 * This demonstrates how to handle errors gracefully.
 */
export const DemoErrorHandling = () => {
  // Uncomment after running 'npm run generate:schema'
  // Try with an invalid filter to see error handling
  // const { data, loading, error } = useCandidates("{InvalidField} = 'test'");

  const data = null;
  const loading = false;
  const error = null;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Demo: Error Handling</h2>
      {loading && <p>Loading...</p>}
      {error && (
        <div style={{ padding: '10px', background: '#ffebee', color: '#c62828', borderRadius: '4px' }}>
          <strong>Error:</strong> {error.message}
        </div>
      )}
      {data && (
        <p style={{ color: '#2e7d32' }}>✓ Data loaded successfully</p>
      )}
      {!loading && !error && !data && (
        <p style={{ color: '#666' }}>
          Uncomment the hook call to test error handling
        </p>
      )}
    </div>
  );
};

/**
 * Demo Component - Filtering
 * 
 * This demonstrates how to use Airtable filter formulas.
 */
export const DemoFiltering = () => {
  // Examples of different filter formulas (uncomment after generating schema):
  
  // Filter by single value
  // const { data: hired } = useCandidates("{Status} = 'Hired'");
  
  // Filter by multiple conditions (AND)
  // const { data: activeInterviews } = useCandidates("AND({Status} = 'Interview', {Stage} = 'Technical')");
  
  // Filter by multiple conditions (OR)
  // const { data: actionNeeded } = useCandidates("OR({Status} = 'Applied', {Status} = 'Interview')");
  
  // Filter with comparisons
  // const { data: highScores } = useCandidates("{Score} > 80");
  
  // Filter with date
  // const { data: recent } = useCandidates("IS_AFTER({Created}, '2024-01-01')");

  return (
    <div style={{ padding: '20px' }}>
      <h2>Demo: Filtering Examples</h2>
      <p>Common Airtable filter formulas:</p>
      <ul style={{ fontFamily: 'monospace', fontSize: '14px' }}>
        <li>Single value: <code>{`{Status} = 'Hired'`}</code></li>
        <li>AND condition: <code>{`AND({Status} = 'Interview', {Stage} = 'Technical')`}</code></li>
        <li>OR condition: <code>{`OR({Status} = 'Applied', {Status} = 'Interview')`}</code></li>
        <li>Comparison: <code>{`{Score} > 80`}</code></li>
        <li>Date filter: <code>{`IS_AFTER({Created}, '2024-01-01')`}</code></li>
      </ul>
      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        See the code comments in this file for usage examples with the generated hooks.
      </p>
    </div>
  );
};

/**
 * Main Demo Component
 */
export const Demo = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ padding: '20px', borderBottom: '2px solid #e0e0e0' }}>
        <h1>🚀 Airtable Integration Demo</h1>
        <p style={{ color: '#666' }}>
          Before using these demos, make sure to:
        </p>
        <ol style={{ color: '#666' }}>
          <li>Add your credentials to <code>.env</code> file</li>
          <li>Run <code>npm run generate:schema</code> to generate types and services</li>
          <li>Uncomment the imports and hook calls in this file</li>
        </ol>
      </div>

      <DemoWithHook />
      <hr style={{ margin: '20px', border: 'none', borderTop: '1px solid #e0e0e0' }} />
      
      <DemoWithService />
      <hr style={{ margin: '20px', border: 'none', borderTop: '1px solid #e0e0e0' }} />
      
      <DemoErrorHandling />
      <hr style={{ margin: '20px', border: 'none', borderTop: '1px solid #e0e0e0' }} />
      
      <DemoFiltering />
    </div>
  );
};

export default Demo;
