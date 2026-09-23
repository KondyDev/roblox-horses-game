import { Rarity } from "shared/types/HorseTypes";

export const RARITY_COLORS: Record<Rarity, Color3> = {
	[Rarity.Common]: Color3.fromRGB(180, 180, 180),
	[Rarity.Rare]: Color3.fromRGB(80, 160, 255),
	[Rarity.Epic]: Color3.fromRGB(180, 90, 230),
	[Rarity.Legendary]: Color3.fromRGB(255, 190, 60),
};
