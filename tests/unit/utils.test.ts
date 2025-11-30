import { formatDate, parseDate } from '../../src/utils/date.util';

describe('Date Utility Functions', () => {
    describe('formatDate', () => {
        it('should format a date to YYYY-MM-DD', () => {
            const date = new Date('2023-10-01T00:00:00Z');
            const formattedDate = formatDate(date);
            expect(formattedDate).toBe('2023-10-01');
        });

        it('should return an empty string for invalid date', () => {
            const invalidDate = new Date('invalid-date');
            const formattedDate = formatDate(invalidDate);
            expect(formattedDate).toBe('');
        });
    });

    describe('parseDate', () => {
        it('should parse a date string to a Date object', () => {
            const dateString = '2023-10-01';
            const parsedDate = parseDate(dateString);
            expect(parsedDate).toEqual(new Date('2023-10-01T00:00:00Z'));
        });

        it('should return null for invalid date string', () => {
            const invalidDateString = 'invalid-date';
            const parsedDate = parseDate(invalidDateString);
            expect(parsedDate).toBeNull();
        });
    });
});