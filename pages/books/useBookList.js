import { useEffect, useMemo, useState, useCallback } from 'react';
import useAxios from '../../helpers/useAxios';

export function useBookList({ page = 1, limit = 15 }) {
  const { response, error, loading } = useAxios({
    url: `/books?page=${page}&limit=${limit}`,
    method: 'get'
  });

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
    books: docs,
    error,
    loading,
    totalPages
  };
}