import { FooterWithPaginationControls } from "../components/FooterWithPaginationControls";
import { GIFGrid } from "../components/GIFGrid";
import { useGiphySearchEndpoint } from "../hooks/useGiphyEndpoints";

export const SearchGIFs = () => {
  const {
    setSearchQuery,
    GIFs,
    getNextSearchResultsPage,
    nextPageIsAvailable,
    getPrevSearchResultsPage,
    prevPageIsAvailable,
  } = useGiphySearchEndpoint();

  return (
    <div>
      <input
        type="text"
        placeholder="Type a search term to get started!"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <GIFGrid gifs={GIFs} />
      <FooterWithPaginationControls
        nextPageButtonOnClick={getNextSearchResultsPage}
        nextPageButtonIsDisabled={!nextPageIsAvailable}
        prevPageButtonOnClick={getPrevSearchResultsPage}
        prevPageButtonIsDisabled={!prevPageIsAvailable}
      />
    </div>
  );
};

export default SearchGIFs;
