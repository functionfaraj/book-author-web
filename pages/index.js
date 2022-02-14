import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Faraj Library</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Faraj Library</a>
        </h1>

        <p className={styles.description}>
          Select what you look for
        </p>

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
