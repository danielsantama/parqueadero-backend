import { format, parseISO } from 'date-fns';

export const formatDate = (date: string | Date, dateFormat: string = 'yyyy-MM-dd'): string => {
    return format(typeof date === 'string' ? parseISO(date) : date, dateFormat);
};

export const getCurrentDate = (): string => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};