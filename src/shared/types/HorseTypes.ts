export enum Rarity {
	Common = "Common",
	Rare = "Rare",
	Epic = "Epic",
	Legendary = "Legendary",
}

export enum AuraTier {
	None = "None",
	Shiny = "Shiny",
	Mystic = "Mystic",
}

export interface StatRange {
	min: number;
	max: number;
}

export interface BreedDefinition {
	id: string;
	displayName: string;
	flavor: string;
	rarity: Rarity;
	stats: {
		speed: StatRange;
		stamina: StatRange;
		temperament: StatRange; // lower - calmer
		jump: StatRange;
	};
	colorOptions: Color3[];
}

export interface HorseStats {
	speed: number;
	stamina: number;
	temperament: number;
	jump: number;
}

export interface HorseInstanceData {
	id: string;
	breedId: string;
	stats: HorseStats;
	auraTier: AuraTier;
	color: Color3;
	caughtAt: number;
}
