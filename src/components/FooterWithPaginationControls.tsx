export const FooterWithPaginationControls = ({
  nextPageButtonOnClick,
  nextPageButtonIsDisabled,
  prevPageButtonOnClick,
  prevPageButtonIsDisabled,
}: {
  nextPageButtonOnClick: () => void;
  nextPageButtonIsDisabled: boolean;
  prevPageButtonOnClick: () => void;
  prevPageButtonIsDisabled: boolean;
}) => {
  return (
    <footer>
      <button
        onClick={prevPageButtonOnClick}
        disabled={prevPageButtonIsDisabled}
      >
        Previous page
      </button>
      <button
        onClick={nextPageButtonOnClick}
        disabled={nextPageButtonIsDisabled}
      >
        Next page
      </button>
    </footer>
  );
};
