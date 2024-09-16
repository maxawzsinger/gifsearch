import { useState } from "react";
import { GiphyGIF } from "../types";
import heartIcon from "../assets/heart_icon.svg";
import { removeUrlParams } from "../utilities";
import React from "react";
import { useSavedGIFsContext } from "../providers/SavedGIFsProvider";

const SaveButton = ({ gif }: { gif: GiphyGIF }) => {
  const { savedGIFs, unsaveGIF, saveGIF } = useSavedGIFsContext();
  const isSaved = savedGIFs.map((gif) => gif.id).includes(gif.id);
  const handleSaveUnsave = () => {
    if (isSaved) {
      unsaveGIF(gif);
    } else {
      saveGIF(gif);
    }
  };
  return (
    <button
      className={`save-button ${isSaved ? "saved" : ""}`}
      onClick={handleSaveUnsave}
    >
      <img src={heartIcon} alt="heart icon" width="20" height="20" />
    </button>
  );
};

export const GIFCard = ({ gif }: { gif: GiphyGIF }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div
      className="gif-card"
      style={{
        height: Number(gif.images.fixed_width.height),
        width: Number(gif.images.fixed_width.width),
      }}
    >
      {isLoading && <div className="skeleton"></div>}
      <img
        src={removeUrlParams(gif.images.fixed_width.url)}
        alt={gif.title}
        onLoad={() => setIsLoading(false)}
        className="gif-image"
        style={{ display: isLoading ? "none" : "block" }}
      />
      {!isLoading && <SaveButton gif={gif} />}
    </div>
  );
};

export const GIFGrid = React.memo(({ gifs }: { gifs: GiphyGIF[] }) => {
  return (
    <div className="gif-grid">
      {gifs.map((gif) => (
        <GIFCard gif={gif} key={gif.id} />
      ))}
    </div>
  );
});
