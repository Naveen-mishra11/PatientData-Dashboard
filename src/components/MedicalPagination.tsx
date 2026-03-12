interface MedicalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MedicalPagination({ currentPage, totalPages, onPageChange }: MedicalPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-24 h-10 rounded-lg border border-gray-300 prev-next ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        &lt; Previous
      </button>
      
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
        >
          {String(page).padStart(2, '0')}
        </button>
      ))}
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-17 h-10 rounded-lg border border-gray-300 prev-next ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next &gt;
      </button>
    </div>
  );
}