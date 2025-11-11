import { useEffect, useState } from "preact/hooks";

interface ParallaxHeroProps {
	imageUrl: string;
	title?: string;
	subtitle?: string;
}

export default function ParallaxHero({
	imageUrl,
	title,
	subtitle,
}: ParallaxHeroProps) {
	const [offsetY, setOffsetY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setOffsetY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div class="relative h-screen overflow-hidden">
			<div
				class="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: `url(${imageUrl})`,
					transform: `translateY(${offsetY * 0.5}px)`,
					willChange: "transform",
				}}
			/>
			<div class="absolute inset-0 bg-foreground/40" />
			{(title || subtitle) && (
				<div class="relative h-full flex items-center justify-center text-white text-center px-4">
					<div>
						{title && (
							<h1 class="text-5xl md:text-7xl font-bold mb-4">
								{title}
							</h1>
						)}
						{subtitle && (
							<p class="text-xl md:text-2xl">{subtitle}</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
