import { useState } from "preact/hooks";

interface Render {
	title: string;
	description: string;
	imageUrl: string;
	thumbnailUrl?: string;
	tags: string[];
}

interface ImageGalleryProps {
	renders: Render[];
}

export default function ImageGallery({ renders }: ImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<Render | null>(null);
	const [filter, setFilter] = useState<string>("all");

	const allTags = Array.from(new Set(renders.flatMap((r) => r.tags)));

	const filteredRenders =
		filter === "all"
			? renders
			: renders.filter((r) => r.tags.includes(filter));

	return (
		<div>
			{/* Filter buttons */}
			<div class="flex gap-2 mb-6 flex-wrap">
				<button
					onClick={() => setFilter("all")}
					class={`px-4 py-2 rounded-md ${
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
						class={`px-4 py-2 rounded-md ${
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
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredRenders.map((render, idx) => (
					<div
						key={`${render.title}-${idx}-${render.imageUrl}`}
						class="cursor-pointer group relative overflow-hidden rounded-lg"
						onClick={() => setSelectedImage(render)}
					>
						<img
							src={render.thumbnailUrl || render.imageUrl}
							alt={render.title}
							loading="lazy"
							class="w-full h-64 object-cover transition-transform group-hover:scale-110"
						/>
						<div class="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
							<p class="text-background text-lg font-semibold">
								{render.title}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Lightbox modal */}
			{selectedImage && (
				<div
					class="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
					onClick={() => setSelectedImage(null)}
				>
					<div
						class="max-w-6xl max-h-full"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={selectedImage.imageUrl}
							alt={selectedImage.title}
							class="max-w-full max-h-[90vh] object-contain"
						/>
						<div class="text-white mt-4">
							<h3 class="text-2xl font-bold">
								{selectedImage.title}
							</h3>
							<p class="mt-2">{selectedImage.description}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
