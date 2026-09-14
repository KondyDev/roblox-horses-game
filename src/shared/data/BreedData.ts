import { BreedDefinition, Rarity } from "shared/types/HorseTypes";

export const BREED_DATA: Record<string, BreedDefinition> = {
	Arabian: {
		id: "Arabian",
		displayName: "Arabian",
		flavor: "Famous for endurance — this breed can run for hours where others tire.",
		rarity: Rarity.Rare,
		stats: {
			speed: { min: 7, max: 10 },
			stamina: { min: 8, max: 10 },
			temperament: { min: 6, max: 10 },
			jump: { min: 5, max: 8 },
		},
		colorOptions: [
			Color3.fromRGB(190, 145, 90), // bay
			Color3.fromRGB(160, 110, 70), // chestnut
			Color3.fromRGB(200, 195, 190), // grey — a real, common Arabian color
		],
	},

	Friesian: {
		id: "Friesian",
		displayName: "Friesian",
		flavor: "A striking all-black coat and a flowing mane — bred more for grace than speed.",
		rarity: Rarity.Rare,
		stats: {
			speed: { min: 4, max: 6 },
			stamina: { min: 5, max: 7 },
			temperament: { min: 8, max: 10 },
			jump: { min: 6, max: 9 },
		},
		colorOptions: [
			Color3.fromRGB(20, 20, 20), // true black
			Color3.fromRGB(30, 25, 22), // deep black-brown
			Color3.fromRGB(15, 15, 18), // black with a faint cool tint
		],
	},

	American_Quarter_Horse: {
		id: "American_Quarter_Horse",
		displayName: "American Quarter Horse",
		flavor: "Built for explosive sprints — the classic ranch horse.",
		rarity: Rarity.Common,
		stats: {
			speed: { min: 7, max: 10 },
			stamina: { min: 3, max: 5 },
			temperament: { min: 6, max: 8 },
			jump: { min: 2, max: 4 },
		},
		colorOptions: [
			Color3.fromRGB(120, 75, 45), // sorrel/chestnut — the classic QH color
			Color3.fromRGB(150, 100, 60), // bay
			Color3.fromRGB(40, 35, 30), // black
			Color3.fromRGB(200, 170, 110), // palomino
		],
	},

	Mustang: {
		id: "Mustang",
		displayName: "Mustang",
		flavor: "Wild-bred and hardy, but stubborn to earn the trust of.",
		rarity: Rarity.Common,
		stats: {
			speed: { min: 6, max: 8 },
			stamina: { min: 5, max: 7 },
			temperament: { min: 8, max: 10 },
			jump: { min: 1, max: 3 },
		},
		colorOptions: [
			Color3.fromRGB(105, 80, 55), // dun
			Color3.fromRGB(150, 120, 80), // buckskin
			Color3.fromRGB(120, 85, 60), // bay
		],
	},

	Clydesdale: {
		id: "Clydesdale",
		displayName: "Clydesdale",
		flavor: "A gentle giant bred for pulling power, not speed.",
		rarity: Rarity.Common,
		stats: {
			speed: { min: 1, max: 3 },
			stamina: { min: 8, max: 10 },
			temperament: { min: 1, max: 3 },
			jump: { min: 1, max: 2 },
		},
		colorOptions: [
			Color3.fromRGB(140, 90, 50), // bay brown, classic Clydesdale
			Color3.fromRGB(90, 60, 40), // darker bay
			Color3.fromRGB(160, 140, 130), // roan-ish grey-brown, a real recognized Clydesdale coloring
		],
	},

	Paint_Horse: {
		id: "Paint_Horse",
		displayName: "Paint Horse",
		flavor: "No two coats are ever quite the same — a collector's favorite.",
		rarity: Rarity.Rare,
		stats: {
			speed: { min: 5, max: 8 },
			stamina: { min: 5, max: 7 },
			temperament: { min: 5, max: 8 },
			jump: { min: 3, max: 5 },
		},
		colorOptions: [
			Color3.fromRGB(150, 100, 60), // brown & white patch base
			Color3.fromRGB(60, 45, 35), // dark bay patch base
			Color3.fromRGB(210, 190, 160), // pale cream patch base
			Color3.fromRGB(90, 70, 50), // chestnut patch base
		],
	},

	// TODO: For later
	// Thoroughbred: {},
	// Shire: {},
	// Hanoverian: {},
	// Andalusian: {},
	// Fjord: {},
	// American_Saddlebred: {},
	// Silesian: {},
	// Akhal_Teke: {},
};
