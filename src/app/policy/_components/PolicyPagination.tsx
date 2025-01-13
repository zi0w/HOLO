type PolicyPaginationProps = {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
};

const PolicyPagination = ({ totalPages, page, setPage }: PolicyPaginationProps) => {
  return <div>PolicyPagination</div>;
};

export default PolicyPagination;
