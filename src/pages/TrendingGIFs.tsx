import { GIFGrid } from "../components/GIFGrid";
import { useGiphyTrendingEndpoint } from "../hooks/useGiphyEndpoints";

import { FooterWithPaginationControls } from "../components/FooterWithPaginationControls";

export const TrendingGIFs = () => {
  const {
    GIFs,
    getNextSearchResultsPage,
    nextPageIsAvailable,
    getPrevSearchResultsPage,
    prevPageIsAvailable,
  } = useGiphyTrendingEndpoint();
  return (
    <div>
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

export default TrendingGIFs;
