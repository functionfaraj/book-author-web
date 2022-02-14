import { useCallback, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useBookList } from './useBookList'

export default function Books() {
  const [page, setPage] = useState(1);
  const { books, loading } = useBookList({ page })
  // console.log('books', books)

  return (
    <div className={styles.container}>
      <Head>
        <title>Books</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="#">Books</a>
        </h1>

        <div className={styles.grid}>
          <Link href="/books">
            <div className={styles.card}>
              <h2>Books &rarr;</h2>
              <p>Find in-depth information about book you need</p>
            </div>
          </Link>
          <Link href="/authors">
            <div className={styles.card}>
              <h2>Authors &rarr;</h2>
              <p>Find in-depth information about author you need</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
