import React, { createContext, useState } from "react";
import { GiphyGIF } from "../types";
import { SAVED_GIFS_LOCAL_STORAGE_KEY } from "../config";
import { useContext } from "react";

export type SavedGIFsContextType = {
  savedGIFs: GiphyGIF[];
  unsaveGIF: (gif: GiphyGIF) => void;
  saveGIF: (gif: GiphyGIF) => void;
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

export const SavedGIFsContext = createContext<SavedGIFsContextType | null>(
  null
);

export const SavedGIFsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedGIFs, setSavedGIFs] = useState<GiphyGIF[]>(
    retrieveGIFsFromLocalStorage()
  );

  const unsaveGIF = (gif: GiphyGIF) => {
    const filteredGIFs = savedGIFs.filter(
      (filteredGif) => filteredGif.id !== gif.id
    );
    writeGIFsToLocalStorage(filteredGIFs);
    setSavedGIFs(filteredGIFs);
  };

  const saveGIF = (gif: GiphyGIF) => {
    const newGIFs = [...savedGIFs, gif];
    writeGIFsToLocalStorage(newGIFs);
    setSavedGIFs(newGIFs);
  };

  return (
    <SavedGIFsContext.Provider value={{ savedGIFs, unsaveGIF, saveGIF }}>
      {children}
    </SavedGIFsContext.Provider>
  );
};

export const useSavedGIFsContext = (): SavedGIFsContextType => {
  const context = useContext(SavedGIFsContext);
  if (!context) {
    throw new Error("You must use this hook inside of the SavedGIFsProvider.");
  }
  return context;
};
