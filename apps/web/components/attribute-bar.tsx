import { cn } from "@/lib/utils";

interface AttributeBarProps {
	label: string;
	value: number;
	max?: number;
	className?: string;
}

export function AttributeBar({
	label,
	value,
	max = 10,
	className,
}: AttributeBarProps) {
	const percentage = (value / max) * 100;

	return (
		<div className={cn("flex items-center gap-3", className)}>
			<span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground">
				{label}
			</span>
			<div className="relative h-2 flex-1 bg-secondary">
				<div
					className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<span className="w-8 shrink-0 text-right font-mono text-xs font-bold text-foreground">
				{value}/{max}
			</span>
		</div>
	);
}
