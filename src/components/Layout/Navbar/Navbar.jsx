import { Gamepad2, Sun, Moon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-bg-surface/80 border-b border-border-default/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div>
            <Link to="/" className="flex items-center gap-2 ">
              <Gamepad2 className="w-8 h-8 text-accent-neon" />
              <span className="font-bold text-xl bg-linear-to-r from-accent-primary to-accent-neon bg-clip-text text-transparent">
                GamesAtlas
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-accent-neon ${
                location.pathname === "/about" ? "text-accent-neon" : ""
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors hover:text-accent-neon ${
                location.pathname === "/contact" ? "text-accent-neon" : ""
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/browse"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent-neon ${
                location.pathname === "/browse" ? "text-accent-neon" : ""
              }`}
            >
              <Search className="w-4 h4" />
              Browse
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 focus:outline-none rounded-full border border-border-default/50 hover:bg-bg-elevated hover:border-accent-primary/50 text-text-secondary hover:text-accent-neon transition-all cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
