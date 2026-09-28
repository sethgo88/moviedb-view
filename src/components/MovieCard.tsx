import type { PublicMovie } from "../types";

const FORMAT_LABEL: Record<string, string> = {
	SD: "SD",
	HD: "HD",
	"4K": "4K",
	CUSTOM: "Custom",
};

function posterSrc(movie: PublicMovie): string | null {
	if (!movie.poster_url) return null;
	if (movie.poster_url.startsWith("http")) return movie.poster_url;
	return null;
}

function displayTitle(movie: PublicMovie): string {
	if (movie.type === "TV_SEASON" && movie.season_number != null) {
		return `${movie.title} — S${movie.season_number}`;
	}
	return movie.title;
}

export function MovieCard({ movie }: { movie: PublicMovie }) {
	const src = posterSrc(movie);
	const isOwned = movie.status === "OWNED";

	return (
		<div className="flex flex-col overflow-hidden rounded-xl bg-gray-900 border border-white/5">
			{/* Poster */}
			<div className="relative aspect-[2/3] w-full bg-gray-800">
				{src ? (
					<img
						src={src}
						alt={movie.title}
						className="h-full w-full object-cover"
						loading="lazy"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-white/20 text-xs text-center px-2">
						{movie.title}
					</div>
				)}
				{/* Status badge */}
				<span
					className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
						isOwned
							? "bg-green-500/20 text-green-400"
							: "bg-yellow-500/20 text-yellow-400"
					}`}
				>
					{isOwned ? "Owned" : "Wanted"}
				</span>
			</div>

			{/* Info */}
			<div className="flex flex-col gap-1 p-2.5">
				<p className="text-xs font-medium text-white leading-tight line-clamp-2">
					{displayTitle(movie)}
				</p>
				<div className="flex items-center gap-1.5 flex-wrap">
					{movie.year && (
						<span className="text-[10px] text-white/40">{movie.year}</span>
					)}
					<span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
						{FORMAT_LABEL[movie.format] ?? movie.format}
					</span>
					{movie.tmdb_rating != null && (
						<span className="text-[10px] text-white/40">
							★ {movie.tmdb_rating.toFixed(1)}
						</span>
					)}
				</div>
				{(movie.is_physical || movie.is_digital) && (
					<div className="flex gap-1 flex-wrap">
						{movie.is_physical && (
							<span className="text-[10px] text-white/30">Physical</span>
						)}
						{movie.is_physical && movie.is_digital && (
							<span className="text-[10px] text-white/20">·</span>
						)}
						{movie.is_digital && (
							<span className="text-[10px] text-white/30">Digital</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
