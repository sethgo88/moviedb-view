export type PublicMovie = {
	id: string;
	title: string;
	year: number | null;
	poster_url: string | null;
	tmdb_id: number | null;
	tmdb_rating: number | null;
	status: string;
	format: string;
	is_physical: boolean;
	is_digital: boolean;
	type: string;
	season_number: number | null;
	show_id: string | null;
};

export type Filters = {
	status: "ALL" | "OWNED" | "WANTED";
	format: "ALL" | "SD" | "HD" | "4K" | "CUSTOM";
	physical: boolean | null;
	digital: boolean | null;
};
