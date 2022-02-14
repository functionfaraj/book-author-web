import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.scss'
import Table from '../../component/table'
import Pagination from '../../component/Pagination/Pagination'
import CreateIcon from '@material-ui/icons/Create';
import { useRouter } from 'next/router'
import AddBox from '@material-ui/icons/AddBox';
import ModalComp from '../../component/Modal'
import { InputBase } from '@material-ui/core'
import DropDownValue from '../../component/DropDownValue/DropDownValue'
import { useAuthorList } from '../authors/useAuthorList'

export default function Authors() {
  const [page, setPage] = useState(1);
  const { authors, loading, totalPages, addAuthor, updateAuthor } = useAuthorList({ page, limit: 5 })
  const router = useRouter()
  useEffect(() => {
    setPage(router.query.page || 1)
  }, [router.query.page])
  const columns = [
    {
      title: "first_name",
      field: "first_name"
    },
    {
      title: "last_name",
      field: "last_name"
    },
    {
      title: 'update',
    },
  ];
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [openModal, setopenModal] = useState(false)
  const [modalType, setModalType] = useState('add')
  const onCloseModal = () => {
    setopenModal(false)
    setFirstName('')
    setLastName('')
  }
  const onClickAddModal = () => {
    setModalType('add')
    setopenModal(true)
  }
  const onClicKSave = async () => {
    const addResult = await addAuthor({ first_name: firstName, last_name: lastName })
    if (addResult?.data?.author) {
      onCloseModal()
    }
  }
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const onClickUpdate = async (author) => {
    setSelectedAuthor(author._id)
    setLastName(author.last_name)
    setFirstName(author.first_name)
    setModalType('update')
    setopenModal(true)
  }
  const onClickUpdateInModal = async () => {
    const updateResult = await updateAuthor(selectedAuthor, { first_name: firstName, last_name: lastName })
    if (updateResult?.data?.author) {
      onCloseModal()
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Authors</title>
      </Head>
      <h1 className={styles.title}>
        <a href="/">Home</a> - <a href="#">Authors</a>
      </h1>

      <AddBox className={`${styles.cursor_pointer}`} onClick={onClickAddModal} />
      <div>
        <Table
          headerRow={columns}
          docs={authors}
          dataLength={authors?.length}
        >
          {
            authors?.length && authors?.map((author) => {
              return (
                <tr key={author._id}>
                  <td className={`${styles.cursor_pointer}`} >{author?.first_name}</td>
                  <td className={`${styles.cursor_pointer}`} >{author?.last_name}</td>
                  <td style={{ width: 100 }}>
                    <div className={[styles.flex_row_center, styles.cursor_pointer, styles.w_100].join(' ')}>
                      <div className={[styles.delete_icon].join(' ')} >
                        <CreateIcon className={[styles.primary_color, styles.f_18, styles.cursor_pointer].join(' ')} onClick={() => onClickUpdate(author)} />
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
          title={modalType === 'add' ? "Add Author" : "Update Author"}
          onClose={onCloseModal}
          onCancel={onCloseModal}
          showBtns={true}
          onSave={modalType === 'add' ? onClicKSave : onClickUpdateInModal}
        >
          <div className={styles.w_100}>
            <div className={styles.modalCn}>
              <div>
                <div>Author First Name</div>
                <InputBase
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  inputProps={{
                    'aria-label': 'naked',
                    "data-testid": "company_description"
                  }}
                  label="Outlined"
                  placeholder='Author First Name'
                  className={styles.textArea}
                />
              </div>
              <div>
                <div>Author Last Name</div>
                <InputBase
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  inputProps={{
                    'aria-label': 'naked',
                    "data-testid": "company_description"
                  }}
                  label="Outlined"
                  placeholder='Author Last Name'
                  className={styles.textArea}
                />
              </div>
            </div>
          </div>
        </ModalComp>
      </div>
    </div>
  )
}
