import React from 'react';
import styles from './style.module.scss'
import PropTypes from 'prop-types'

export default function Table({ headerRow = [], children, dataLength, docs, title }) {
    return (
        <div>
            <table className={styles.table} id="table-to-xls">
                <tr>
                    {
                        headerRow?.map((row, i) => {
                            if (row.show !== false) {
                                return (
                                    <th key={'row_' + i}>{row.text || row.title}</th>
                                )
                            }
                        })
                    }
                </tr>
                {dataLength ? children : <tr>
                    <td colSpan={headerRow.length}>There is no data or its loading</td>
                </tr>}
            </table>
        </div>
    );
}

Table.propTypes = {
    headerRow: PropTypes.array,
    children: PropTypes.any,
    dataLength: PropTypes.number,
    docs: PropTypes.docs,
    title: PropTypes.title
};