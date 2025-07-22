import { useState } from 'react';
import useApp from './useApp';

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

interface UseImportOptions<T> {
  validate: (item: T) => string[];
  process: (item: T) => Promise<void>;
}

export const useCSVImport = <T>({ validate, process }: UseImportOptions<T>) => {
  const [isImporting, setIsImporting] = useState(false);

  const importItems = async (items: T[]): Promise<ImportResult> => {
    const result: ImportResult = { success: 0, failed: 0, errors: [] };
    setIsImporting(true);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const errors = validate(item);

      if (errors.length > 0) {
        result.failed++;
        result.errors.push(`Row ${i + 2}: ${errors.join(', ')}`);
        continue;
      }

      try {
        await process(item);
        result.success++;
      } catch (err) {
        result.failed++;
        result.errors.push(`Row ${i + 2}: ${err.message || 'Unknown error'}`);
      }
    }

    setIsImporting(false);
    return result;
  };

  return { isImporting, importItems };
};
