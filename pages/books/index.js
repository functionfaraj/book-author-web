import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import { useBookList } from './useBookList'
import Table from '../../component/table'
import Pagination from '../../component/Pagination/Pagination'
import CreateIcon from '@material-ui/icons/Create';
import { useRouter } from 'next/router'
import AddBox from '@material-ui/icons/AddBox';

export default function Books() {
  const [page, setPage] = useState(1);
  const { books, loading, totalPages } = useBookList({ page, limit: 5 })
  const router = useRouter()
  useEffect(() => {
    setPage(router.query.page || 1)
  }, [router.query.page])
  const columns = [
    {
      title: "name",
      field: "name"
    },
    {
      title: "isbn",
      field: "isbn"
    },
    {
      title: 'author',
      field: "author"
    },
    {
      title: 'update',
    },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Books</title>
      </Head>
      <h1 className={styles.title}>
        <a href="/">Home</a> - <a href="#">Books</a>
      </h1>

      <AddBox className={`${styles.cursor_pointer}`} />
      <div>
        <Table
          headerRow={columns}
          docs={books}
          dataLength={books?.length}
        >
          {
            books?.length && books?.map((book) => {
              return (
                <tr key={book._id}>
                  <td className={`${styles.cursor_pointer}`}>{book?.name}</td>
                  <td className={`${styles.cursor_pointer}`}>{book?.isbn}</td>
                  <td className={`${styles.cursor_pointer}`}>{`${book?.author?.first_name} ${book?.author?.last_name}`}</td>
                  <td style={{ width: 100 }}>
                    <div className={[styles.flex_row_center, styles.cursor_pointer, styles.w_100].join(' ')}>
                      <div className={[styles.delete_icon].join(' ')} >
                        <CreateIcon className={[styles.primary_color, styles.f_18, styles.cursor_pointer].join(' ')} />
                      </div>
                    </div>
                  </td>

                </tr>)
            })
          }
        </Table>
        <Pagination
          pages={totalPages}
          currentPage={page || 1}
        />
      </div>
    </div>
  )
}
