import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import { useBook } from './useBook'
import { useRouter } from 'next/router'

export default function Book() {
    const router = useRouter()
    const { book } = useBook({ _id: router.query._id });
    return (book ?
        <div className={styles.container}>
            <Head>
                <title>{book.name}</title>
            </Head>
            <h1 className={styles.title}>
                <a href="/">Home</a> - <a href="/books">Books</a>- <a href="#">{book.name}</a>
            </h1>
            <div>
                Book Name : {book.name}<br />
                Book ISBN :{book.name}<br />
                Book Author :{`${book.author.first_name} ${book.author.last_name}`}
            </div>
        </div> : <div>Loading</div>
    )
}
