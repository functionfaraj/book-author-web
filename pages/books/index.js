import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import { useBookList } from './useBookList'
import Table from '../../component/table'
import Pagination from '../../component/Pagination/Pagination'
import CreateIcon from '@material-ui/icons/Create';
import { useRouter } from 'next/router'
import AddBox from '@material-ui/icons/AddBox';
import ModalComp from '../../component/Modal'
import { InputBase } from '@material-ui/core'
import DropDownValue from '../../component/DropDownValue/DropDownValue'
import { useAuthorList } from '../authors/useAuthorList'

export default function Books() {
  const [page, setPage] = useState(1);
  const { books, loading, totalPages, addBook, updateBook } = useBookList({ page, limit: 5 })
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
  const [bookName, setBookName] = useState('')
  const [bookISBN, setBookISBN] = useState('')
  const [bookAuthor, setBookAuthor] = useState('')
  const [openModal, setopenModal] = useState(false)
  const [modalType, setModalType] = useState('add')
  const onCloseModal = () => {
    setopenModal(false)
    setBookName('')
    setBookISBN('')
    setBookAuthor('')
  }
  const { authors } = useAuthorList({ limit: 100 })
  const onClickAddModal = () => {
    setModalType('add')
    setopenModal(true)
  }
  const onClicKSave = async () => {
    const addResult = await addBook({ name: bookName, isbn: bookISBN, author: bookAuthor._id })
    if (addResult?.data?.book) {
      onCloseModal()
    }
  }
  const [selectedBook, setSelectedBook] = useState('')
  const onClickUpdate = async (book) => {
    setSelectedBook(book._id)
    setBookName(book.name)
    setBookISBN(book.isbn)
    setBookAuthor(book.author)
    setModalType('update')
    setopenModal(true)
  }
  const onClickUpdateInModal = async () => {
    const updateResult = await updateBook(selectedBook, { name: bookName, isbn: bookISBN, author: bookAuthor._id })
    if (updateResult?.data?.book) {
      onCloseModal()
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Books</title>
      </Head>
      <h1 className={styles.title}>
        <a href="/">Home</a> - <a href="#">Books</a>
      </h1>

      <AddBox className={`${styles.cursor_pointer}`} onClick={onClickAddModal} />
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
                        <CreateIcon className={[styles.primary_color, styles.f_18, styles.cursor_pointer].join(' ')} onClick={() => onClickUpdate(book)} />
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
        <ModalComp
          openModal={openModal}
          title={modalType === 'add' ? "Add Book" : "Update Book"}
          onClose={onCloseModal}
          onCancel={onCloseModal}
          showBtns={true}
          onSave={modalType === 'add' ? onClicKSave : onClickUpdateInModal}
        >
          <div className={styles.w_100}>
            <div className={styles.modalCn}>
              <div>
                <div>Book Name</div>
                <InputBase
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  inputProps={{
                    'aria-label': 'naked',
                    "data-testid": "company_description"
                  }}
                  label="Outlined"
                  placeholder='Book name'
                  className={styles.textArea}
                />
              </div>
              <div>
                <div>Book ISBN</div>
                <InputBase
                  value={bookISBN}
                  onChange={(e) => setBookISBN(e.target.value)}
                  inputProps={{
                    'aria-label': 'naked',
                    "data-testid": "company_description"
                  }}
                  label="Outlined"
                  placeholder='Book ISBN'
                  className={styles.textArea}
                />
              </div>
              <div>
                <div>Book Author</div>
                <div className={styles.dropDown}>
                  <DropDownValue
                    id='first_name'
                    placeholder={'Select Author'}
                    options={authors}
                    value={`${bookAuthor?.first_name} ${bookAuthor?.last_name}`}
                    setCB={(value) => {
                      console.log('value', value)
                      setBookAuthor(value)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </ModalComp>
      </div>
    </div>
  )
}
