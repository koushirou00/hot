// src/functions/api/constants/header.ts
import { getAuthToken } from '@/utils/supabase/getAuthToken';

type HeaderOption = {
  'Content-Type': 'application/json';
  Authorization?: string;
};

export const createHeaderOption = async (login: boolean = false): Promise<HeaderOption> => {
  const defaultHeader: HeaderOption = {
    'Content-Type': 'application/json'
  };
  if (!login) return defaultHeader;

  const authToken = await getAuthToken();
  return {
    ...defaultHeader,
    Authorization: `Bearer ${authToken}`
  };
};
