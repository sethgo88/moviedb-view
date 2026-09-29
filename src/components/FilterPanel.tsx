import type { Filters } from "../types";

type Props = {
	filters: Filters;
	onChange: (f: Filters) => void;
};

function Chip({
	active,
	onClick,
	children,
}: {
	active: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
				active
					? "border-blue-500 bg-blue-600 text-white"
					: "border-white/15 bg-white/5 text-white/60 hover:bg-white/10"
			}`}
		>
			{children}
		</button>
	);
}

export function FilterPanel({ filters, onChange }: Props) {
	return (
		<div className="flex flex-col gap-3">
			{/* Status */}
			<div className="flex items-center gap-2 flex-wrap">
				<span className="text-xs text-white/30 w-14">Status</span>
				{(["ALL", "OWNED", "WANTED"] as const).map((s) => (
					<Chip
						key={s}
						active={filters.status === s}
						onClick={() => onChange({ ...filters, status: s })}
					>
						{s === "ALL" ? "All" : s === "OWNED" ? "Own" : "Want"}
					</Chip>
				))}
			</div>

			{/* Format */}
			<div className="flex items-center gap-2 flex-wrap">
				<span className="text-xs text-white/30 w-14">Format</span>
				{(["ALL", "SD", "HD", "4K", "CUSTOM"] as const).map((f) => (
					<Chip
						key={f}
						active={filters.format === f}
						onClick={() => onChange({ ...filters, format: f })}
					>
						{f === "ALL" ? "All" : f}
					</Chip>
				))}
			</div>

			{/* Physical / Digital */}
			<div className="flex items-center gap-2 flex-wrap">
				<span className="text-xs text-white/30 w-14">Type</span>
				<Chip
					active={filters.physical === null && filters.digital === null}
					onClick={() => onChange({ ...filters, physical: null, digital: null })}
				>
					All
				</Chip>
				<Chip
					active={filters.physical === true}
					onClick={() =>
						onChange({
							...filters,
							physical: filters.physical === true ? null : true,
							digital: null,
						})
					}
				>
					Physical
				</Chip>
				<Chip
					active={filters.digital === true}
					onClick={() =>
						onChange({
							...filters,
							digital: filters.digital === true ? null : true,
							physical: null,
						})
					}
				>
					Digital
				</Chip>
			</div>
		</div>
	);
}
