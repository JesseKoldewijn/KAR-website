import { useRef, useState } from "preact/hooks";
import type { Render } from "../../data/rooms/roomConfig.types";

interface ImageGalleryProps {
	renders: Render[];
}

export default function ImageGallery({ renders }: Readonly<ImageGalleryProps>) {
	const lightboxRef = useRef<HTMLButtonElement | null>(null);
	const lastClickedRef = useRef<HTMLButtonElement | null>(null);

	const [selectedImage, setSelectedImage] = useState<Render | null>(null);
	const [filter, setFilter] = useState<string>("all");

	const allTags = Array.from(new Set(renders?.flatMap((r) => r.tags) || []));

	const filteredRenders =
		filter === "all"
			? renders
			: renders.filter((r) => r.tags?.includes(filter));

	const handleOpenLightbox = (
		e: preact.TargetedMouseEvent<HTMLButtonElement>,
		render: Render
	) => {
		e.preventDefault();
		lastClickedRef.current = e.currentTarget;
		setSelectedImage(render);
		setTimeout(() => {
			lightboxRef.current?.focus();
		}, 0);
	};

	const handleCloseLightbox = () => {
		setSelectedImage(null);
		lastClickedRef.current?.focus();
	};

	return (
		<div>
			{/* Filter buttons */}
			<div className="flex gap-2 mb-6 flex-wrap">
				<button
					onClick={() => setFilter("all")}
					className={`px-4 py-2 rounded-md ${
						filter === "all"
							? "bg-primary text-primary-foreground"
							: "bg-secondary"
					}`}
				>
					All
				</button>
				{allTags.map((tag) => (
					<button
						key={tag}
						onClick={() => setFilter(tag)}
						className={`px-4 py-2 rounded-md ${
							filter === tag
								? "bg-primary text-primary-foreground"
								: "bg-secondary"
						}`}
					>
						{tag}
					</button>
				))}
			</div>

			{/* Gallery grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredRenders.map((render, idx) => (
					<button
						key={`${render.title}-${idx}-${render.imageUrl}`}
						className="cursor-pointer group relative overflow-hidden rounded-lg"
						onClick={(e) => handleOpenLightbox(e, render)}
					>
						<img
							src={render.thumbnailUrl || render.imageUrl}
							alt={render.title}
							loading="lazy"
							className="w-full h-64 object-cover transition-transform group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<p className="text-background text-lg font-semibold">
								{render.title}
							</p>
						</div>
					</button>
				))}
			</div>

			{/* Lightbox modal */}
			<button
				ref={lightboxRef}
				className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
				onClick={handleCloseLightbox}
				aria-hidden={selectedImage ? "false" : "true"}
				style={{
					display: selectedImage ? "flex" : "none",
				}}
			>
				<div className="max-w-6xl max-h-full">
					<img
						src={selectedImage?.imageUrl}
						alt={selectedImage?.title}
						className="max-w-full max-h-[90vh] object-contain"
					/>
					<div className="text-white mt-4">
						<h3 className="text-2xl font-bold">
							{selectedImage?.title}
						</h3>
						<p className="mt-2">{selectedImage?.description}</p>
					</div>
				</div>
			</button>
		</div>
	);
}
