import React, { useState } from 'react';
interface ImportResult {
  success: number;
  failed: number;
  created: number;
  updated: number;
  errors: string[];
}

interface UseImportOptions<T> {
  validate: (item: T) => string[];
  process: (item: T) => Promise<'created' | 'updated'>;
}

export const useCSVImport = <T>({ validate, process }: UseImportOptions<T>) => {
  const [isImporting, setIsImporting] = useState(false);

  const importItems = async (items: T[]): Promise<ImportResult> => {
    const result: ImportResult = {
      success: 0,
      failed: 0,
      created: 0,
      updated: 0,
      errors: [],
    };

    setIsImporting(true);

    for (const [index, item] of items.entries()) {
      const errors = validate(item);

      if (errors.length > 0) {
        result.failed++;
        result.errors.push(`Row ${index + 2}: ${errors.join(', ')}`);
        continue;
      }

      try {
        const action = await process(item);
        result.success++;
        if (action === 'created') result.created++;
        else if (action === 'updated') result.updated++;
      } catch (err) {
        result.failed++;
        result.errors.push(
          `Row ${index + 2}: ${err.message || 'Unknown error'}`,
        );
      }
    }

    setIsImporting(false);
    return result;
  };

  return { isImporting, importItems };
};
