import { useState } from "react";
import { GIFGrid } from "../components/GIFGrid";
import { FooterWithPaginationControls } from "../components/FooterWithPaginationControls";
import { PAGE_SIZE } from "../config";
import { useSavedGIFsContext } from "../providers/SavedGIFsProvider";

export const SavedGIFs = () => {
  const { savedGIFs } = useSavedGIFsContext();
  const [offset, setOffset] = useState(0);

  const startIndex = offset;
  const endIndex = offset + PAGE_SIZE;

  const currentGIFs = savedGIFs.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (offset - PAGE_SIZE >= 0) {
      setOffset((prevOffset) => prevOffset - PAGE_SIZE);
    }
  };

  const handleNextPage = () => {
    if (offset + PAGE_SIZE < savedGIFs.length) {
      setOffset((prevOffset) => prevOffset + PAGE_SIZE);
    }
  };

  return (
    <div>
      {currentGIFs.length > 0 ? (
        <GIFGrid gifs={currentGIFs} />
      ) : (
        <p>You have no saved GIFs.</p>
      )}
      <FooterWithPaginationControls
        nextPageButtonOnClick={handleNextPage}
        nextPageButtonIsDisabled={offset + PAGE_SIZE >= savedGIFs.length}
        prevPageButtonOnClick={handlePrevPage}
        prevPageButtonIsDisabled={offset === 0}
      />
    </div>
  );
};
