import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Pagination = ({ totalPage, currentPage, onPageChange, }) => {
  const pageNumbers = [];

  // Tạo nút trang đầu tiên
  const handleFirstPage = () => {
    onPageChange(1);
  };

  // Tạo nút trang cuối cùng
  const handleLastPage = () => {
    onPageChange(totalPage);
  };

  // Tạo nút trang trước đó
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Tạo nút trang kế tiếp
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  // Tạo danh sách các nút trang
  let startPage = 1;
  let endPage = totalPage;

  if (totalPage > 6) {
    if (currentPage > 3) {
      startPage = currentPage - 2;
      endPage = currentPage + 3 > totalPage ? totalPage : currentPage + 2;
    } else {
      endPage = 6;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <li key={i} className={i === currentPage ? 'active' : ''}>
        <button onClick={() => onPageChange(i)}>{i}</button>
      </li>
    );
  }

  return (
    <div>
      <ul className='pagination'>
        {/* Nút trang đầu tiên */}
        <li>
          <button onClick={handleFirstPage}>Trang đầu</button>
        </li>

        {/* Nút trang trước đó */}
        <li>
          <button onClick={handlePrevPage}>Trang trước</button>
        </li>

        {/* Các nút trang */}
        {pageNumbers}

        {/* Nút trang kế tiếp */}
        <li>
          <button onClick={handleNextPage}>Trang kế</button>
        </li>

        {/* Nút trang cuối cùng */}
        <li>
          <button onClick={handleLastPage}>Trang cuối</button>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  totalPage: PropTypes.any.isRequired,
  currentPage: PropTypes.any.isRequired,
  onPageChange: PropTypes.any.isRequired,
};

export default Pagination;
