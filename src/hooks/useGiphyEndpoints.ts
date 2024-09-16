import { PAGE_SIZE } from "../config";
import { GiphyGIF, GiphyResponse } from "../types";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useGiphySearchEndpoint = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [GIFs, setGIFs] = useState<GiphyGIF[]>([]);
  const [nextPageIsAvailable, setNextPageIsAvailable] =
    useState<boolean>(false);
  const prevPageIsAvailable = currentOffset > 0;

  const debouncedStartNewSearch = useDebounce({
    callback: () => {
      startNewSearchAndGetFirstResultsPage();
    },
    delayMS: 300,
  });

  // Search starts as soon as the user finishes typing for more than 300ms
  useEffect(() => {
    if (searchQuery.length > 0) debouncedStartNewSearch();
  }, [searchQuery]);

  const startNewSearchAndGetFirstResultsPage = async () => {
    const currentSearchQuery = searchQuery;

    try {
      const { data, pagination } = await fetchGiphySearchResults({
        offset: 0,
        searchQuery,
      });
      if (currentSearchQuery !== searchQuery) return; //avoid race conditions
      setGIFs(data);
      setCurrentOffset(0);
      setNextPageIsAvailable(pagination.total_count > data.length);
    } catch (e) {
      window.alert("There was an issue fetching searched GIFS.");
    }
  };

  const getNextSearchResultsPage = async () => {
    if (!nextPageIsAvailable) {
      //nextPageIsAvailable should be used to disable this fn
      console.log("More results are not available");
      return;
    }
    const newOffset = currentOffset + PAGE_SIZE;
    try {
      const { data, pagination } = await fetchGiphySearchResults({
        offset: newOffset,
        searchQuery,
      });
      setGIFs(data);
      setCurrentOffset(newOffset);
      setNextPageIsAvailable(pagination.total_count > newOffset + data.length);
    } catch (e) {
      window.alert("There was an issue fetching searched GIFS.");
    }
  };

  const getPrevSearchResultsPage = async () => {
    if (!prevPageIsAvailable) {
      //prevPageIsAvailable should be used to disable this fn
      console.log("Less results are not available");
      return;
    }
    const newOffset = Math.max(0, currentOffset - PAGE_SIZE);
    try {
      const { data, pagination } = await fetchGiphySearchResults({
        offset: newOffset,
        searchQuery,
      });
      setGIFs(data);
      setCurrentOffset(newOffset);
      setNextPageIsAvailable(pagination.total_count > newOffset + data.length);
    } catch (e) {
      window.alert("There was an issue fetching searched GIFS.");
    }
  };

  return {
    setSearchQuery,
    GIFs,
    getNextSearchResultsPage,
    nextPageIsAvailable,
    getPrevSearchResultsPage,
    prevPageIsAvailable,
  };
};

export const useGiphyTrendingEndpoint = () => {
  const [currentOffset, setCurrentOffset] = useState<number>(0); //this is the index of the first gif on the page
  const [GIFs, setGIFs] = useState<GiphyGIF[]>([]);
  const [nextPageIsAvailable, setNextPageIsAvailable] =
    useState<boolean>(false);
  const prevPageIsAvailable = currentOffset > 0;

  useEffect(() => {
    const f = async () => {
      const { data, pagination } = await fetchGiphyTrendingResults({
        offset: 0,
      });
      setGIFs(data);
      setNextPageIsAvailable(pagination.total_count > data.length);
    };
    f();
  }, []);

  const getNextSearchResultsPage = async () => {
    if (!nextPageIsAvailable) {
      //nextPageIsAvailable should be used to disable this fn
      console.log("More results are not available");
      return;
    }
    const newOffset = currentOffset + PAGE_SIZE;
    try {
      const { data, pagination } = await fetchGiphyTrendingResults({
        offset: newOffset,
      });
      setGIFs(data);
      setCurrentOffset(newOffset);
      setNextPageIsAvailable(pagination.total_count > newOffset + data.length);
    } catch (e) {
      window.alert("There was an issue fetching searched GIFS.");
    }
  };

  const getPrevSearchResultsPage = async () => {
    if (!prevPageIsAvailable) {
      //prevPageIsAvailable should be used to disable this fn
      console.log("Less results are not available");
      return;
    }
    const newOffset = Math.max(0, currentOffset - PAGE_SIZE);
    try {
      const { data, pagination } = await fetchGiphyTrendingResults({
        offset: newOffset,
      });
      setGIFs(data);
      setCurrentOffset(newOffset);
      setNextPageIsAvailable(pagination.total_count > newOffset + data.length);
    } catch (e) {
      window.alert("There was an issue fetching searched GIFS.");
    }
  };

  return {
    GIFs,
    getNextSearchResultsPage,
    nextPageIsAvailable,
    getPrevSearchResultsPage,
    prevPageIsAvailable,
  };
};

const fetchGiphySearchResults = async ({
  offset,
  searchQuery,
}: {
  offset: number;
  searchQuery: string;
}): Promise<GiphyResponse> => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
      searchQuery
    )}&limit=${PAGE_SIZE}&offset=${offset}`
  );
  return await response.json();
};

const fetchGiphyTrendingResults = async ({
  offset,
}: {
  offset: number;
}): Promise<GiphyResponse> => {
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${PAGE_SIZE}&offset=${offset}`
  );
  return await response.json();
};
