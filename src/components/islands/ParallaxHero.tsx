import { useEffect, useState } from "preact/hooks";
import { cn } from "../../lib/utils";

interface ParallaxHeroProps {
	imageUrl: string;
	title?: string;
	subtitle?: string;
}

export default function ParallaxHero({
	imageUrl,
	title,
	subtitle,
}: Readonly<ParallaxHeroProps>) {
	return (
		<div className="relative h-screen overflow-hidden">
			<BackgroundImage imageUrl={imageUrl} alt={title} />
			<div className="absolute inset-0 bg-foreground/40" />
			{(title || subtitle) && (
				<div className="relative h-screen flex items-center justify-center text-white text-center px-4">
					<div>
						{title && (
							<h1 className="text-5xl md:text-7xl font-bold mb-4">
								{title}
							</h1>
						)}
						{subtitle && (
							<p className="text-xl md:text-2xl">{subtitle}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}

function BackgroundImage({
	imageUrl,
	alt,
}: {
	readonly imageUrl: string;
	readonly alt?: string;
}) {
	const [offsetY, setOffsetY] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Check if device is mobile (width < 768px)
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		const handleScroll = () => {
			// Only apply parallax on desktop
			if (window.innerWidth >= 768) {
				setOffsetY(window.scrollY);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return (
		<img
			src={imageUrl}
			alt={alt || "Hero image"}
			className={cn({
				"absolute inset-0 w-full h-full object-cover": !isMobile,
				"w-svw h-svh object-cover fixed -z-50": isMobile,
			})}
			style={{
				transform: isMobile ? "none" : `translateY(${offsetY * 0.5}px)`,
				willChange: isMobile ? "auto" : "transform",
			}}
			loading="eager"
		/>
	);
}
