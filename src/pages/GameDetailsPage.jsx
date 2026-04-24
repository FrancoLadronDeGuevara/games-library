import { useEffect, useState } from "react";
import { gamesApi } from "../api/gameApi";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Cpu,
  Download,
  HardDrive,
  MemoryStick,
  Monitor,
} from "lucide-react";
import { motion } from "framer-motion";

const GameDetailsPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await gamesApi.getGameDetails(id);
        setGame(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-bg-elevated border-t-accent-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="w-full grow flex justify-center items-center min-h-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold my-4 text-accent-danger">
            Game not found
          </h2>
          <Link to="/browse" className="text-accent-primary hover:underline">
            Return to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pb-20">
      <div className="relative w-full h-[50vh] md:h-[60vh] max-h-150 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-bg-base via-bg-base/80 to-transparent z-10">
          <img
            src={
              game.screenshots && game.screenshots.length > 0
                ? game.screenshots[0].image
                : game.thumbnail
            }
            alt={game.title}
            className="absolute inset-0 w-full h-full object-cover opacity-70 blur-[2px]"
          />
          <div className="absolute z-20 top-8 left-4 sm:left-8 lg:left-0 lg:max-w-7xl lg:mx-auto w-full px-4 sm:px-6 lg:px-8">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-white hover:text-text-secondary transition-colors bg-accent-primary backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to games
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col md:flex-row gap-8 items-end">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-48 md:w-64 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-border-default/20 shrink-0 relative z-30"
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grow pb-4"
              >
                <div className="flex flex-wrap gap-2 mb-3 mt-4 md:mt-0">
                  <span className="px-3 py-1 bg-accent-neon/80 backdrop-blur-sm shadow-lg text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {game.genre}
                  </span>
                  <span className="px-3 py-1 bg-bg-elevated/80 backdrop-blur-sm text-text-primary text-xs font-bold rounded-full uppercase tracking-wider border border-border-default/30">
                    {game.status}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-md">
                  {game.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white font-medium">
                  <span className="flex items-center gap-1">
                    <Monitor className="w-4 h-4" /> {game.platform}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>{game.developer}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  <span>{game.release_date}</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-4"
              >
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-linear-to-r from-accent-primary to-accent-neon hover:to-accent-glow text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-accent-primary/40 transition-all hover:-translate-y-1"
                >
                  Play Now <Download className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent-neon rounded-full"></span>
              About {game.title}
            </h2>
            <div
              className="prose prose-invert max-w-none text-text-secondary leading-relaxed bg-bg-surface p-6 rounded-2xl border border-border-default/40 shadow-sm"
              dangerouslySetInnerHTML={{
                __html: game.description.replace(/\n\r?/g, "<br />"),
              }}
            />
          </motion.section>

          {/* Screenshots */}
          {game.screenshots && game.screenshots.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-accent-primary rounded-full"></span>
                Screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {game.screenshots.map((shot, i) => (
                  <motion.div
                    key={shot.id}
                    className="rounded-xl overflow-hidden border border-border-default/20 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img
                      src={shot.image}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {game.minimum_system_requirements && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-accent-warn rounded-full"></span>
                System Requirements
              </h2>
              <div className="bg-bg-surface rounded-2xl border border-border-default/40 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                  <HardDrive className="w-64 h-64" />
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-sm text-text-muted flex items-center gap-1.5 mb-1">
                      <Monitor className="w-4 h-4" /> OS
                    </p>
                    <p className="font-medium">
                      {game.minimum_system_requirements.os || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted flex items-center gap-1.5 mb-1">
                      <Cpu className="w-4 h-4" /> Processor
                    </p>
                    <p className="font-medium text-sm">
                      {game.minimum_system_requirements.processor || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted flex items-center gap-1.5 mb-1">
                      <MemoryStick className="w-4 h-4" /> Memory
                    </p>
                    <p className="font-medium">
                      {game.minimum_system_requirements.memory || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <div>
                    <p className="text-sm text-text-muted flex items-center gap-1.5 mb-1">
                      <Monitor className="w-4 h-4" /> Graphics
                    </p>
                    <p className="font-medium text-sm">
                      {game.minimum_system_requirements.graphics || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-muted flex items-center gap-1.5 mb-1">
                      <HardDrive className="w-4 h-4" /> Storage
                    </p>
                    <p className="font-medium">
                      {game.minimum_system_requirements.storage || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-bg-surface rounded-2xl border border-border-default/40 p-6 shadow-sm sticky top-24"
          >
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-border-default/30">
              Additional Info
            </h3>
            <ul className="space-y-5 text-sm">
              <li>
                <span className="text-text-muted block mb-1">Developer</span>
                <span className="font-semibold">{game.developer}</span>
              </li>
              <li>
                <span className="text-text-muted block mb-1">Publisher</span>
                <span className="font-semibold">{game.publisher}</span>
              </li>
              <li>
                <span className="text-text-muted block mb-1">Release Date</span>
                <span className="font-semibold">{game.release_date}</span>
              </li>
              <li>
                <span className="text-text-muted block mb-1">Genre</span>
                <span className="font-semibold text-accent-neon">
                  {game.genre}
                </span>
              </li>
              <li>
                <span className="text-text-muted block mb-1">Platform</span>
                <span className="font-semibold">{game.platform}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
