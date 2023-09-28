export function getYear(date: string) {
    const dt = new Date(date);
    return dt.getFullYear();
}
export const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });