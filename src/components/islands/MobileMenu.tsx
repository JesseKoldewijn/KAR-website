import { useState } from "preact/hooks";

interface MobileMenuProps {
	readonly rooms: Record<string, string>;
}

export default function MobileMenu({ rooms }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		console.log("Toggling menu");
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={toggleMenu}
				class="md:hidden p-2 w-max max-w-40 hover:bg-accent rounded-md border-none transition-colors relative z-100 flex items-center-safe justify-center-safe"
				aria-label="Toggle menu"
				aria-expanded={isOpen}
			>
				{isOpen ? (
					<svg
						class="w-6 h-6 transition-opacity duration-200 opacity-100"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				) : (
					<svg
						class="w-6 h-6 transition-opacity duration-200 opacity-100"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				)}
			</button>

			{/* Overlay and Menu Portal */}
			{isOpen && (
				<>
					{/* Overlay */}
					<div
						class="fixed w-[300vw] h-screen bg-background/80 blur-lg"
						onClick={closeMenu}
						style="left: -100vw; right: 0; top: 0; bottom: 0;"
					/>

					{/* Mobile Navigation Menu */}
					<div class="fixed inset-0 w-screen h-screen shadow-lg z-50">
						<ul class="px-4 py-20 flex flex-col gap-4 justify-center-safe h-full text-foreground">
							{Object.entries(rooms).map(([slug, name]) => (
								<li key={slug}>
									<a
										href={`/rooms/${slug}`}
										onClick={closeMenu}
										class="block border-2 border-foreground bg-background text-center w-full px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
									>
										{name}
									</a>
								</li>
							))}
						</ul>
					</div>
				</>
			)}
		</>
	);
}
