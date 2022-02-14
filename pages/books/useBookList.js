import { useEffect, useMemo, useState, useCallback } from 'react';
import useAxios from '../../helpers/useAxios';

export function useBookList({ page = 1 }) {
  const { response, error, loading } = useAxios({
    url: `/books?page=${page}`,
    method: 'get'
  });

  const docs = useMemo(() => {
    if (response) {
      return response?.docs;
    }
  }, [response]);

  return {
    books: docs,
    error,
    loading,
  };
}