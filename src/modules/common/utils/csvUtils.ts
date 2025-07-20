export type CSVRow = Record<string, any>;

export type RowExtractor<T> = (item: T) => CSVRow;
export const convertObjectsToCSV = (
    headers: string[],
    rows: CSVRow[],
): string => {
    if (!rows.length) return '';

    function escapeCSV(value: any): string {
        if (Array.isArray(value)) {
            value = value.join(';');
        } else if (value && typeof value === 'object') {
            value = JSON.stringify(value);
        }
        return `"${String(value ?? '').replace(/"/g, '""')}"`;
    }

    const csvRows = [
        headers.join(','),
        ...rows.map((row) =>
            headers.map((header) => escapeCSV(row[header])).join(','),
        ),
    ];

    return csvRows.join('\n');
};

export const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};
