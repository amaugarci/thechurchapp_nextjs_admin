import { format, getTime, formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export function fDate(date: Date | string | number | null | undefined | Timestamp) {
  if (!date) return '';
  if (date instanceof Timestamp) date = date.toDate();
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date: Date | string | number | null | undefined | Timestamp) {
  if (!date) return '';

  if (date instanceof Timestamp) date = date.toDate();
  return format(new Date(date), 'MM/dd/yyyy p');
}

export function fTimestamp(date: Date | string | number | null | undefined | Timestamp) {
  if (!date) return '';

  if (date instanceof Timestamp) date = date.toDate();
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number | null | undefined | Timestamp) {
  if (!date) return '';
  if (date instanceof Timestamp) date = date.toDate();
  return format(new Date(date), 'MMM d, yyyy @ p');
}

export function fToNow(date: Date | string | number | null | undefined | Timestamp) {
  if (!date) return '';
  if (date instanceof Timestamp) date = date.toDate();
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function timeToDate(date: Date | string | number | null | undefined | Timestamp): Date | null {
  if (!date) return null;
  if (date instanceof Timestamp) date = date.toDate();
  return new Date(date);
}
