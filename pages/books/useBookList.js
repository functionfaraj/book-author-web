import { useEffect, useMemo, useState, useCallback } from 'react';
import useAxios from '../../helpers/useAxios';

export function useBookList({ page = 1, limit = 15 }) {
  const [result, setResult] = useState([])
  const { response, error, loading, get } = useAxios({ url: `/books?page=${page}&limit=${limit}` });
  useEffect(() => {
    get()
  }, [limit, page])
  const docs = useMemo(() => {
    if (response) {
      setResult(response?.docs)
      return response?.docs;
    }
  }, [response]);

  const totalPages = useMemo(() => {
    if (response) {
      return response?.totalPages;
    }
  }, [response]);

  const { post, put } = useAxios({ url: `/books` });

  const addBook = useCallback(async (data) => {
    const addResult = await post(data)
    if (addResult?.data?.book) {
      let books = result
      books = [addResult?.data?.book, ...books]
      setResult(books)
    }
    return addResult
  }, [result])

  const updateBook = useCallback(async (_id, data) => {
    const updated = await put('/books/' + _id, data)
    let elemIndex = result.findIndex((elem) => elem._id === _id)
    let books = result
    books[elemIndex] = updated.data.book
    setResult(books)
    return updated
  }, [result])

  return {
    books: result,
    error,
    loading,
    totalPages,
    addBook,
    updateBook
  };
}