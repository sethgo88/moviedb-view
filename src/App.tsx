import { useState } from "react";
import "./App.css";
import { FilterPanel } from "./components/FilterPanel";
import { MovieCard } from "./components/MovieCard";
import { useDebounce } from "./hooks/useDebounce";
import { useMovies } from "./hooks/useMovies";
import type { Filters, PublicMovie } from "./types";

const DEFAULT_FILTERS: Filters = {
	status: "ALL",
	format: "ALL",
	physical: null,
	digital: null,
};

function applyFilters(
	movies: PublicMovie[],
	search: string,
	filters: Filters,
): PublicMovie[] {
	const q = search.toLowerCase();
	return movies.filter((m) => {
		if (q && !m.title.toLowerCase().includes(q)) return false;
		if (filters.status !== "ALL" && m.status !== filters.status) return false;
		if (filters.format !== "ALL" && m.format !== filters.format) return false;
		if (filters.physical === true && !m.is_physical) return false;
		if (filters.digital === true && !m.is_digital) return false;
		return true;
	});
}

export default function App() {
	const { data: movies = [], isLoading, isError } = useMovies();
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
	const [filtersOpen, setFiltersOpen] = useState(false);
	const debouncedSearch = useDebounce(search);

	const filtered = applyFilters(movies, debouncedSearch, filters);
	const hasActiveFilters =
		filters.status !== "ALL" ||
		filters.format !== "ALL" ||
		filters.physical !== null ||
		filters.digital !== null;

	return (
		<div className="min-h-screen bg-gray-950 text-white">
			{/* Header */}
			<header className="sticky top-0 z-10 border-b border-white/10 bg-gray-950/90 backdrop-blur-sm">
				<div className="mx-auto max-w-5xl px-5 pt-4 pb-3">
					{/* Title — full width row on mobile, inline on sm+ */}
					<div className="flex items-center gap-3 sm:hidden mb-2">
						<h1 className="text-sm font-semibold text-white/70 tracking-wide uppercase">
							Movie Collection
						</h1>
						<span className="text-xs text-white/30">
							{movies.length} titles
						</span>
					</div>

					<div className="flex items-center gap-2">
						<h1 className="hidden sm:block text-base font-semibold text-white shrink-0">
							Movie Collection
						</h1>
						<input
							type="search"
							placeholder="Search…"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="flex-1 min-w-0 min-h-[48px] rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/15"
						/>
						<button
							type="button"
							onClick={() => setFiltersOpen((v) => !v)}
							className={`shrink-0 min-h-[48px] rounded-lg px-5 text-xs font-semibold transition-colors ${
								hasActiveFilters || filtersOpen
									? "bg-blue-600 text-white"
									: "bg-white/10 text-white/60"
							}`}
						>
							{hasActiveFilters ? "Filter •" : "Filter"}
						</button>
					</div>
				</div>

				{filtersOpen && (
					<div className="mx-auto max-w-5xl px-5 pb-4 pt-2 border-t border-white/5 mt-1">
						<FilterPanel filters={filters} onChange={setFilters} />
					</div>
				)}
			</header>

			{/* Content */}
			<main className="mx-auto max-w-5xl px-5 py-5">
				{isLoading && (
					<p className="text-center text-sm text-white/40 py-20">Loading…</p>
				)}
				{isError && (
					<p className="text-center text-sm text-red-400 py-20">
						Failed to load collection.
					</p>
				)}
				{!isLoading && !isError && filtered.length === 0 && (
					<p className="text-center text-sm text-white/40 py-20">
						No titles match.
					</p>
				)}
				{!isLoading && !isError && filtered.length > 0 && (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{filtered.map((m) => (
							<MovieCard key={m.id} movie={m} />
						))}
					</div>
				)}
			</main>
		</div>
	);
}
