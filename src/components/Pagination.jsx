import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';


const PaginatedItems = ({ items, setPaginationItems, itemsPerPage})=>{
  // We start with an empty list of items.

  const [pageCount, setPageCount] = useState(1);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  useEffect(() => {
    setPaginationItems(items?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);




  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    <Stack direction='horizontal'>
        <h6 className='mx-auto'>{`Showing ${itemOffset+1}-${endOffset} of ${items?.length} records`}</h6>
    </Stack>
      <ReactPaginate 
        className='nav justify-content-center gap-2 mt-2'
        pageClassName='d-flex align-items-center'
        nextClassName='nav-item btn btn-primary p-0 ms-3'
        nextLinkClassName='nav-link text-white'
        activeLinkClassName='btn bg-dark text-white'
        pageLinkClassName=' h-75 btn btn-sm border-1 border-dark'
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLinkClassName='nav-link text-white'
        previousClassName='nav-item btn btn-dark p-0 me-3'
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;