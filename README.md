# React + TypeScript + Airtable Boilerplate

A production-ready boilerplate for building React applications with type-safe Airtable integration. This project includes automatic schema generation from your Airtable base, generating TypeScript interfaces, services, and React hooks.

## ✨ Features

- 🚀 **Vite + React 19 + TypeScript** - Modern development stack
- 🔄 **Auto-generated Types & Services** - Generate TypeScript interfaces from Airtable schema
- 🎣 **Type-safe Hooks** - Custom React hooks for each table with full type safety
- 💾 **Built-in Caching** - 1-minute TTL cache for optimal performance
- 🛡️ **Error Handling** - Comprehensive error types and handling
- 📝 **Zero Configuration** - Works out of the box with minimal setup

## 📋 Prerequisites

- Node.js 18+ and npm
- An Airtable account with a base
- Airtable Personal Access Token (PAT)

## 🚀 Quick Start

### 1. Clone and Install

```bash
npm install
```

### 2. Configure Airtable Credentials

Copy the example environment file and add your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
VITE_AIRTABLE_PAT=your_personal_access_token_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
```

**Getting your credentials:**
- **Personal Access Token (PAT)**: Create at https://airtable.com/create/tokens
  - Required scopes: `data.records:read`, `schema.bases:read`
- **Base ID**: Found in your Airtable URL: `https://airtable.com/app...XXXXX.../...`

### 3. Generate Schema

Run the schema generator to create TypeScript types, services, and hooks from your Airtable base:

```bash
npm run generate:schema
```

This will:
- Fetch the schema from Airtable Metadata API
- Generate TypeScript interfaces for all tables and fields
- Create type-safe service files for each table
- Generate React hooks for each table
- Output files to `src/services/airtable/generated/` and `src/hooks/generated/`

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173 to see the demo application.

## 📁 Project Structure

```
.
├── src/
│   ├── services/
│   │   ├── airtable/
│   │   │   ├── client.ts              # Airtable client configuration
│   │   │   ├── types.ts               # Base TypeScript types
│   │   │   └── generated/             # 🔄 Auto-generated (gitignored)
│   │   │       ├── tables.types.ts    # Generated table interfaces
│   │   │       └── *.service.ts       # Generated services per table
│   │   └── cache/
│   │       └── cacheService.ts        # Caching layer (1 min TTL)
│   ├── hooks/
│   │   ├── useAirtableRecords.ts      # Generic hook for any table
│   │   └── generated/                 # 🔄 Auto-generated (gitignored)
│   │       └── *.ts                   # Generated hooks per table
│   ├── config/
│   │   └── airtable.config.ts         # Configuration settings
│   ├── demo.tsx                       # Usage examples
│   └── App.tsx                        # Main app component
├── scripts/
│   ├── generateSchema.ts              # Schema generation script
│   └── templates/                     # Code generation templates
│       ├── service.template.ts
│       └── hook.template.ts
├── .env.example                       # Environment variables template
└── package.json
```

## 🎯 Usage

### Using Generated Hooks (Recommended)

After running `npm run generate:schema`, you'll have type-safe hooks for each table:

```typescript
import { useCandidates } from './hooks/generated/useCandidates';

function MyComponent() {
  const { data, loading, error, refetch } = useCandidates();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map(record => (
        <div key={record.id}>
          {record.fields.Name} - {record.fields.Email}
        </div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

### With Filtering

```typescript
// Filter by status
const { data } = useCandidates("{Status} = 'Hired'");

// Multiple conditions
const { data } = useCandidates("AND({Status} = 'Interview', {Stage} = 'Technical')");

// Date filters
const { data } = useCandidates("IS_AFTER({Created}, '2024-01-01')");
```

### Using Generated Services

For more control, use the generated services directly:

```typescript
import { CandidatesService } from './services/airtable/generated/candidates.service';

async function fetchData() {
  // Get all records
  const all = await CandidatesService.getAll();
  
  // Get by ID
  const one = await CandidatesService.getById('recXXXXXXXXXXXXXX');
  
  // Get with filter
  const filtered = await CandidatesService.getByFilter("{Status} = 'Active'");
}
```

## 🔄 When to Regenerate Schema

Run `npm run generate:schema` whenever you:
- ✅ Add or remove fields in Airtable
- ✅ Change field types
- ✅ Add or remove tables
- ✅ Rename fields or tables
- ✅ Add or modify select field options

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run generate:schema` | Generate types and services from Airtable |

## 📝 Generated Types Example

For a table named "candidates" with fields: Name, Email, Status, the generator creates:

```typescript
// src/services/airtable/generated/tables.types.ts
export interface CandidatesFields {
  'Name'?: string;
  'Email'?: string;
  'Status'?: 'Applied' | 'Interview' | 'Hired' | 'Rejected';
}

export interface CandidatesRecord {
  id: string;
  fields: CandidatesFields;
  createdTime: string;
}
```

## 🔌 Adding New Tables

1. Create the table in Airtable
2. Run `npm run generate:schema`
3. The generator automatically creates:
   - Type interfaces in `tables.types.ts`
   - Service file: `{tableName}.service.ts`
   - React hook: `use{TableName}.ts`
4. Import and use in your components

No manual configuration needed!

## 🎨 Field Type Mapping

| Airtable Type | TypeScript Type |
|---------------|-----------------|
| Single line text | `string` |
| Long text | `string` |
| Email | `string` |
| Number | `number` |
| Checkbox | `boolean` |
| Single select | `'Option1' \| 'Option2' \| ...` |
| Multiple selects | `string[]` |
| Date | `string` (ISO format) |
| Attachments | `Attachment[]` |
| Link to another record | `string[]` |

## 💾 Caching

The boilerplate includes a simple in-memory cache with 1-minute TTL:

```typescript
import { cacheService } from './services/cache/cacheService';

// Cache is automatic with hooks, but you can also use it manually:
cacheService.set('key', data, 60000); // 60 seconds
const cached = cacheService.get('key');
cacheService.invalidate('key');
cacheService.clear();
```

## 🚨 Error Handling

Built-in error types for common scenarios:

```typescript
import { 
  AirtableError,
  AirtableNotFoundError,
  AirtableAuthError,
  AirtableRateLimitError 
} from './services/airtable/types';

try {
  await CandidatesService.getById('invalid-id');
} catch (error) {
  if (error instanceof AirtableNotFoundError) {
    console.log('Record not found');
  } else if (error instanceof AirtableAuthError) {
    console.log('Authentication failed');
  }
}
```

## 🔐 Security Notes

- ⚠️ Never commit your `.env` file
- ✅ Use environment variables for credentials
- ✅ The `.env.example` file is provided as a template
- ✅ Generated files are gitignored and recreated on each machine

## 🚀 Future Extensions

The generated services include commented-out methods for future implementation:

```typescript
// Uncomment and implement as needed:
// create(fields: CandidatesFields)
// update(id: string, fields: Partial<CandidatesFields>)
// delete(id: string)
// bulkCreate(records: CandidatesFields[])
```

## 🤝 Contributing

This is a boilerplate template. Fork and customize for your needs!

## 📄 License

MIT

## 🆘 Troubleshooting

### "Missing Airtable credentials" error
- Ensure `.env` file exists with `VITE_AIRTABLE_PAT` and `VITE_AIRTABLE_BASE_ID`
- Restart dev server after adding environment variables

### "Failed to fetch schema" error
- Check that your PAT has `data.records:read` and `schema.bases:read` scopes
- Verify the Base ID is correct
- Ensure you have access to the Airtable base

### Types not updating
- Run `npm run generate:schema` again
- Restart your TypeScript server in your IDE
- Check that generated files are not manually edited

### Import errors after generation
- Ensure the dev server is running
- Restart the dev server
- Check that paths in imports match generated file names

## 📚 Learn More

- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)
- [Airtable Metadata API](https://airtable.com/developers/web/api/metadata-api)
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)

---

Made with ❤️ for developers who want type-safe Airtable integration
