import { useEffect, useMemo, useState, useCallback } from 'react';
import useAxios from '../../helpers/useAxios';

export function useAuthorList({ page = 1, limit = 15 }) {
  const { response, error, loading, get } = useAxios({ url: `/authors?page=${page}&limit=${limit}` });
  useEffect(() => {
    get()
  }, [limit, page])
  const docs = useMemo(() => {
    if (response) {
      return response?.docs;
    }
  }, [response]);

  const totalPages = useMemo(() => {
    if (response) {
      return response?.totalPages;
    }
  }, [response]);

  return {
    authors: docs,
    error,
    loading,
    totalPages
  };
}