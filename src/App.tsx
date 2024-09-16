import { useState } from "react";
import TrendingGIFs from "./pages/TrendingGIFs";
import SearchGIFs from "./pages/SearchGIFs";
import { SavedGIFs } from "./pages/SavedGIFs";
import { SavedGIFsProvider } from "./providers/SavedGIFsProvider";

function App() {
  const [view, setView] = useState<"trending" | "saved" | "search">("trending");

  return (
    <SavedGIFsProvider>
      <div className="app-container">
        <header>
          <h2>Giphy Viewer</h2>
          <nav>
            <button
              onClick={() => setView("search")}
              style={{ background: view === "search" ? "orange" : undefined }}
            >
              Search
            </button>
            <button
              onClick={() => setView("trending")}
              style={{ background: view === "trending" ? "orange" : undefined }}
            >
              Trending
            </button>
            <button
              onClick={() => setView("saved")}
              style={{ background: view === "saved" ? "orange" : undefined }}
            >
              Saved
            </button>
          </nav>
        </header>
        <main>
          {view === "trending" ? <TrendingGIFs /> : null}
          {view === "search" ? <SearchGIFs /> : null}
          {view === "saved" ? <SavedGIFs /> : null}
        </main>
      </div>
    </SavedGIFsProvider>
  );
}

export default App;
