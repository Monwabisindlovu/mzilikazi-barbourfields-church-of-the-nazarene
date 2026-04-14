import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

// Detect if app is running inside an iframe
export const isIframe = window.self !== window.top;
