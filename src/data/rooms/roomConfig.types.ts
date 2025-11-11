export interface RoomConfig {
	slug: string;
	title: string;
	subtitle: string;
	thumbnailUrl: string;
	bannerImageUrl: string;
	description?: string;
	order: number;
	renders?: Render[];
}

export interface Render {
	title: string;
	room: string;
	description: string;
	imageUrl: string;
	thumbnailUrl?: string;
	dimensions: {
		width: number;
		height: number;
	};
	featured: boolean;
	tags: string[];
}

export function createRoom(config: RoomConfig): RoomConfig {
	const renders = import.meta.glob(`./*/renders/*.ts`, {
		eager: true,
	});
	return {
		...config,
		renders: Object.values(renders)
			.map((mod) => (mod as any).default as Render)
			.filter((x) => x.room === config.slug),
	};
}

export function getConfigBySlug(slug: string): RoomConfig | undefined {
	const configs = getAllRoomConfigs();
	return configs.find((config) => config.slug === slug);
}

export function getAllRoomConfigs(): RoomConfig[] {
	const configs = import.meta.glob(`./*/roomConfig.ts`, { eager: true });
	return Object.values(configs).map(
		(mod) => (mod as any).default as RoomConfig
	);
}
