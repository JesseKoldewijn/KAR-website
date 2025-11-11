import { defineCollection, z } from "astro:content";

const rendersCollection = defineCollection({
	type: "data",
	schema: z.object({
		title: z.string(),
		room: z.enum([
			"living-room",
			"bedroom",
			"kitchen",
			"bathroom",
			"office",
		]),
		description: z.string(),
		imageUrl: z.string(),
		thumbnailUrl: z.string().optional(),
		dimensions: z.object({
			width: z.number(),
			height: z.number(),
		}),
		featured: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		renderDate: z.date().optional(),
	}),
});

export const collections = {
	renders: rendersCollection,
};
