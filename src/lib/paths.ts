import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { assets } from '$app/paths';


const FALLBACK_ROUTE = '/map';

export const staticPath = (path: string): string => `${assets}/${path}`

export const backRoute = (fallback = FALLBACK_ROUTE): string => {
  if (!browser) return fallback;

  const { referrer } = document;
  return referrer.length > 0 ? referrer : fallback
}


export const goback = (fallback = FALLBACK_ROUTE): Promise<any> => goto(backRoute(fallback));
