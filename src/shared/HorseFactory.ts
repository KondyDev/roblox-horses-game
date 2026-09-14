import { HttpService } from "@rbxts/services";
import { AuraTier, HorseInstanceData, StatRange } from "./types/HorseTypes";
import { BREED_DATA } from "./data/BreedData";

const rollInRange = (range: StatRange): number => {
	return math.random(range.min, range.max);
};

const rollAuraTier = (): AuraTier => {
	const roll = math.random(1, 1000);
	if (roll <= 10) return AuraTier.Mystic;
	if (roll <= 150) return AuraTier.Shiny;
	return AuraTier.None;
};

export const rollHorse = (breedId: string): HorseInstanceData => {
	const breed = BREED_DATA[breedId];
	if (breed === undefined) {
		error(`rollHorse: unknown breedId "${breedId}"`);
	}

	const newHorse: HorseInstanceData = {
		id: HttpService.GenerateGUID(false),
		breedId: breedId,
		auraTier: rollAuraTier(),
		color: breed.colorOptions[math.random(0, breed.colorOptions.size() - 1)],
		stats: {
			speed: rollInRange(breed.stats.speed),
			stamina: rollInRange(breed.stats.stamina),
			temperament: rollInRange(breed.stats.temperament),
			jump: rollInRange(breed.stats.jump),
		},
		caughtAt: os.time(),
	};

	return newHorse;
};
