import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const ROOMS = {
	"living-room": "Living Room",
	bedroom: "Bedroom",
	kitchen: "Kitchen",
	bathroom: "Bathroom",
	office: "Office",
} as const;

export type RoomType = keyof typeof ROOMS;
