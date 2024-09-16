import { GiphyGIF } from "./types";
import { SAVED_GIFS_LOCAL_STORAGE_KEY } from "./config";
export const removeUrlParams = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.search = "";
    return parsedUrl.toString();
  } catch (e) {
    return url;
  }
};

export const retrieveGIFsFromLocalStorage = (): GiphyGIF[] => {
  try {
    const response = localStorage.getItem(SAVED_GIFS_LOCAL_STORAGE_KEY);
    if (!response) return [];
    return JSON.parse(response);
  } catch (e) {
    window.alert("There was an issue retrieving your saved GIFs.");
    return [];
  }
};

const writeGIFsToLocalStorage = (savedGIFs: GiphyGIF[]) => {
  try {
    localStorage.setItem(
      SAVED_GIFS_LOCAL_STORAGE_KEY,
      JSON.stringify(savedGIFs)
    );
  } catch (e) {
    window.alert("There was an issue saving your GIFs");
  }
};

export const removeGIFFromLocalStorage = (gifForRemoval: GiphyGIF) => {
  const existingGIFs = retrieveGIFsFromLocalStorage();
  const filteredGIFs = existingGIFs.filter(
    (filteredGif) => filteredGif.id !== gifForRemoval.id
  );
  writeGIFsToLocalStorage(filteredGIFs);
};

export const addGIFToLocalStorage = (gifToAdd: GiphyGIF) => {
  const existingGIFs = retrieveGIFsFromLocalStorage();
  const newGIFs = [...existingGIFs, gifToAdd];
  writeGIFsToLocalStorage(newGIFs);
};

export const isGifInLocalStorage = (gifToAdd: GiphyGIF): boolean => {
  const existingGIFs = retrieveGIFsFromLocalStorage();
  return existingGIFs.map((gif) => gif.id).includes(gifToAdd.id);
};
