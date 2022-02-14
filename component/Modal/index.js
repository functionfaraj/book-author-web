import React from 'react';
import styles from './style.module.scss'
import PropTypes from 'prop-types'
import Modal from '@material-ui/core/Modal';

export default function ModalComp({
  onSave = () => { },
  onCancel = () => { },
  canSave = true,
  openModal,
  onClose,
  title,
  className,
  cancelTitle = 'cancel',
  saveTitle = 'save',
  showCancelBtn = true,
  showSaveBtn = true,
  showBtns = true,
  ...props }) {
  const { children } = props
  return (
    <Modal
      disableEnforceFocus
      open={openModal}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={[styles.modal_container, className, styles.padding_bottom_20].join(' ')}>
        <div className={styles.modal_header_container}>
          <div className={styles.modal_header_title}>{title}</div>
          <div className={styles.modal_header_close} onClick={onClose}><img src='/close.svg' /></div>
        </div>
        <div className={[styles.modal_contant, styles.h_80].join(' ')}>
          {children}
        </div>
        {
          showBtns && <div className={`${styles.flex_row_center} ${styles.margin_top_20}   ${styles.nextBtns}`}>
            {
              showSaveBtn &&
              <div className={[canSave ? styles.primary_btn : styles.danger_btn, styles.margin_right_7, styles.margin_left_7].join(' ')}
                onClick={onSave}>{saveTitle}
              </div>
            }
            {
              showCancelBtn &&
              <div className={styles.primary_outline_btn} onClick={onCancel}>
                {cancelTitle}
              </div>
            }
          </div>
        }


      </div>
    </Modal>
  );
}

ModalComp.propTypes = {
  openModal: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any,
  cancelTitle: PropTypes.string,
  saveTitle: PropTypes.string,
  onSave: PropTypes.func,
  canSave: PropTypes.bool,
  showCancelBtn: PropTypes.bool,
  showSaveBtn: PropTypes.bool,
  showBtns: PropTypes.bool,
  onCancel: PropTypes.func,

};
