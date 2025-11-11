import type { ReactNode } from "preact/compat";
import { cn } from "../../lib/utils";

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"rounded-2xl h-full w-full p-4 overflow-hidden border border-foreground/40 group-hover:border-foreground/40 relative z-20",
				className
			)}
		>
			<div className="relative z-50">
				<div className="p-4">{children}</div>
			</div>
		</div>
	);
};

export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4 className={cn("font-bold tracking-wide mt-4", className)}>
			{children}
		</h4>
	);
};

export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) => {
	return (
		<p
			className={cn(
				"mt-8 tracking-wide leading-relaxed text-sm",
				className
			)}
		>
			{children}
		</p>
	);
};
