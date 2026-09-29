import type { PublicMovie } from "../types";

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
		<div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gray-800">
			{/* Poster background */}
			{src ? (
				<img
					src={src}
					alt=""
					aria-hidden="true"
					className="absolute inset-0 h-full w-full object-cover brightness-40 grayscale-25"
					loading="lazy"
				/>
			) : (
				<div className="absolute inset-0 flex items-center justify-center text-white/10 text-xs text-center px-2">
					{movie.title}
				</div>
			)}

			{/* Content overlay */}
			<div className="absolute inset-0 flex flex-col justify-end p-4 gap-1.5">
				<p className="text-xs font-semibold text-white leading-tight line-clamp-2">
					{displayTitle(movie)}
				</p>
				{movie.year && (
					<p className="text-[11px] text-white/60">{movie.year}</p>
				)}
				<div className="flex items-center gap-1.5 flex-wrap">
					<span
						className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
							isOwned
								? "bg-green-600/20 text-green-400"
								: "bg-yellow-600/20 text-yellow-400"
						}`}
					>
						{isOwned ? "Own" : "Want"}
					</span>
					{isOwned && (
						<span className="text-[10px] text-white/50">
							{movie.is_physical ? "Physical" : "Digital only"}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
