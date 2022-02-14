import React from 'react'
import { useRouter } from 'next/router';
import styles from './pagination.module.scss';
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Pagination({ pages, currentPage }) {

    const router = useRouter()

    const pagginationHandler = (page) => {
        const currentPath = router?.pathname;
        const currentQuery = { ...router?.query }; //Copy current query to avoid its removing
        currentQuery.page = page.selected + 1;
        router?.push({
            pathname: currentPath,
            query: currentQuery,
        });

    };
    return (
        pages > 1 &&
        <div className={[styles.flex_row, styles.pagination].join(' ')}>

            <ReactPaginate
                nextLabel={<ArrowForwardIcon className={[styles.primary_color, styles.f_20].join(' ')} />}
                previousLabel={<ArrowBackIcon className={[styles.primary_color, styles.f_20].join(' ')} />}
                breakLabel={'...'}
                breakClassName={[styles.background_white, styles.rounded_200, styles.flex_row_center, styles.font_size_16_normal, styles.primary_color, styles.item].join(' ')}
                activeClassName={[styles.background_green_caribbean, styles.rounded_200, styles.flex_row_center, styles.font_size_16_normal, styles.color_white, styles.item].join(' ')}
                pageClassName={[styles.background_white, styles.rounded_200, styles.flex_row_center, styles.font_size_16_normal, styles.primary_color, styles.item].join(' ')}
                containerClassName={styles.flex_row}
                previousClassName={[styles.background_white, styles.rounded_200, styles.flex_row_center, styles.font_size_16_normal, styles.primary_color, styles.item].join(' ')}
                nextClassName={[styles.background_white, styles.rounded_200, styles.flex_row_center, styles.font_size_16_normal, styles.primary_color, styles.item].join(' ')}
                initialPage={currentPage - 1}
                pageCount={pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={pagginationHandler}
            />


        </div >
    )
}

Pagination.propTypes = {
    pages: PropTypes.number,
    currentPage: PropTypes.number
};