import { useQuery } from "@tanstack/react-query";
import type { PublicMovie } from "../types";

export function useMovies() {
	return useQuery<PublicMovie[]>({
		queryKey: ["movies"],
		queryFn: () =>
			fetch("movies.json").then((r) => {
				if (!r.ok) throw new Error(`Failed to load movies.json: ${r.status}`);
				return r.json() as Promise<PublicMovie[]>;
			}),
		staleTime: 5 * 60 * 1000,
	});
}
