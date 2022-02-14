import { useEffect, useMemo, useState, useCallback } from 'react';
import useAxios from '../../helpers/useAxios';

export function useBook({ _id }) {
  const { response, error, loading, get } = useAxios({ url: `/books/${_id}` });
  useEffect(() => {
    get()
  }, [_id])
  const doc = useMemo(() => {
    if (response) {
      return response;
    }
  }, [response]);

  return {
    book: doc,
    error,
    loading,
  };
}