import { useEffect, useMemo, useState } from "react";
import { Search, Monitor, Globe, Filter } from "lucide-react";
import { gamesApi } from "@/api/gameApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CATEGORIES = [
  "MMORPG",
  "Shooter",
  "Strategy",
  "Racing",
  "MOBA",
  "Sports",
  "Sandbox",
  "Social",
  "Action RPG",
  "Action",
  "Flight",
  "Battle Royale",
];

const BrowsePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const params = {};
        if (platform !== "all") params.platform = platform;
        if (category) params.category = category;

        const data = await gamesApi.getGames(params);
        setGames(data);
        setPage(1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [platform, category]);

  const filteredGames = useMemo(() => {
    if (!search) return games;
    return games.filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [games, search]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = filteredGames.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Browse Games</h1>
          <p className="text-text-secondary">
            Explore our entire catalogue of free-to-play games.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative grow md:grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search games..."
              className="pl-9 pr-4 py-2 w-full bg-bg-surface border border-border-default rounded-lg text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-bg-surface border border-border-default rounded-lg text-sm focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all"
            >
              <option value="">All categories</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex bg-bg-surface rounded-lg border border-border-default overflow-hidden">
            <button
              onClick={() => setPlatform("all")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                platform === "all"
                  ? "bg-accent-primary text-white"
                  : "text-text-secondary hover:bg-bg-elevated"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPlatform("pc")}
              className={`px-3 py-2 text-sm flex items-center gap-1 font-medium transition-colors ${
                platform === "pc"
                  ? "bg-accent-primary text-white"
                  : "text-text-secondary hover:bg-bg-elevated"
              }`}
            >
              <Monitor /> PC
            </button>
            <button
              onClick={() => setPlatform("browser")}
              className={`px-3 py-2 text-sm flex items-center gap-1 font-medium transition-colors ${
                platform === "browser"
                  ? "bg-accent-primary text-white"
                  : "text-text-secondary hover:bg-bg-elevated"
              }`}
            >
              <Globe /> Web
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="w-full flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-bg-elevated border-t-accent-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {filteredGames.length === 0 ? (
            <div className="text-center py-20 bg-bg-surface rounded-2xl border border-border-default border-dashed">
              <h3 className="text-3xl font-semibold mb-2">No games found</h3>
              <p className="text-text-muted">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {paginatedGames.map((game, i) => (
                  <motion.div
                    key={game.id}
                    layoutId={`game-${game.id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Link
                      to={`/game/${game.id}`}
                      className="group block h-full relative overflow-hidden rounded-xl bg-bg-surface border border-border-default/50 hover:border-accent-primary transition-all shadow-sm hover:shadow-accent-primary/20 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-bg-elevated">
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 flex flex-col h-[calc(100%-12rem)] min-h-40">
                        <div className="flex justify-between items-start mb-2 gap-2">
                          <h3 className="font-bold text-lg leading-tight group-hover:text-accent-neon transition-colors">
                            {game.title}
                          </h3>
                          <span className="bg-bg-elevated/80 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-text-muted whitespace-nowrap mt-1">
                            {game.platform === "PC (Windows)" ? "PC" : "Web"}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary line-clamp-2 mt-1 grow">
                          {game.short_description}
                        </p>
                        <div className="mt-4 pt-3 border-t border-border-default/50 flex justify-between items-center text-xs text-text-muted">
                          <span className="font-semibold text-accent-neon bg-accent-neon/10 px-2 py-1 rounded-md">
                            {game.genre}
                          </span>
                          <span
                            className="truncate max-w-30"
                            title={game.developer}
                          >
                            {game.developer}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 rounded-lg bg-bg-surface border border-border-default text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-elevated transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium px-4">
                    Page <span className="text-accent-primary">{page}</span> of{" "}
                    {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg bg-bg-surface border border-border-default text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-elevated transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BrowsePage;
