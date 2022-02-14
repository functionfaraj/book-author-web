import { useEffect, useMemo, useState, useCallback } from 'react';
import useAxios from '../../helpers/useAxios';

export function useAuthorList({ page = 1, limit = 15 }) {
  const [result, setResult] = useState([])
  const { response, error, loading, get } = useAxios({ url: `/authors?page=${page}&limit=${limit}` });
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

  const { post, put } = useAxios({ url: `/authors` });

  const addAuthor = useCallback(async (data) => {
    const addResult = await post(data)
    if (addResult?.data?.author) {
      let authors = result
      authors = [addResult?.data?.author, ...authors]
      setResult(authors)
    }
    return addResult
  }, [result])

  const updateAuthor = useCallback(async (_id, data) => {
    const updated = await put('/authors/' + _id, data)
    let elemIndex = result.findIndex((elem) => elem._id === _id)
    let authors = result
    authors[elemIndex] = updated.data.author
    setResult(authors)
    return updated
  }, [result])

  return {
    authors: result,
    error,
    loading,
    totalPages,
    addAuthor,
    updateAuthor
  };
}