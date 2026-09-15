import { CollectionService } from "@rbxts/services";
import { WILD_HORSE_TAG_NAME } from "server/TagNames";
import { BREED_DATA } from "shared/data/BreedData";
import { rollHorse } from "shared/HorseFactory";
import { Remotes } from "shared/Remotes";
import { BreedDefinition, Rarity } from "shared/types/HorseTypes";

interface BondSession {
	horse: Instance;
	breed: BreedDefinition;
	requiredTaps: number;
	tapsLanded: number;
}
const activeSessions = new Map<Player, BondSession>();

const hookHorsePrompt = (horse: Instance) => {
	const prompt = horse.FindFirstChild("ProximityPrompt") as ProximityPrompt | undefined;
	if (prompt === undefined) return;

	prompt.Triggered.Connect((player) => {
		if (activeSessions.has(player)) return;

		const breedId = horse.GetAttribute("BreedId") as string;
		const breed = BREED_DATA[breedId];
		if (breed === undefined) return;

		const { duration, requiredTaps } = getCatchParams(breed);

		Remotes.BondMinigameStart.FireClient(player, duration, requiredTaps, breed.displayName);

		activeSessions.set(player, { horse, breed, requiredTaps, tapsLanded: 0 });
		task.delay(duration, () => resolveSession(player));
	});
};

const resolveSession = (player: Player) => {
	const session = activeSessions.get(player);
	if (session === undefined) return;

	activeSessions.delete(player);
	const outcome = session.tapsLanded >= session.requiredTaps ? "success" : "fail";

	if (outcome === "success") {
		const horse = rollHorse(session.breed.id);
		print(
			`Caught a ${session.breed.displayName}! Stats: speed=${horse.stats.speed}, stamina=${horse.stats.stamina}, temperament=${horse.stats.temperament}, jump=${horse.stats.jump}, aura=${horse.auraTier}`,
		);
		session.horse.Destroy();
	} else {
		print("Horse got away...");
	}
};

const getCatchParams = (breed: BreedDefinition): { duration: number; requiredTaps: number } => {
	const { duration: baseDuration, taps: baseTaps } = getBaseCatchParams(breed.rarity);

	const avgSpeed = (breed.stats.speed.min + breed.stats.speed.max) / 2;
	const avgTemperament = (breed.stats.temperament.min + breed.stats.temperament.max) / 2;

	const duration = math.max(2, baseDuration - avgSpeed * 0.2);
	const requiredTaps = baseTaps + math.floor(avgTemperament * 0.3);

	return { duration, requiredTaps };
};

const getBaseCatchParams = (rarity: Rarity): { duration: number; taps: number } => {
	switch (rarity) {
		case Rarity.Common:
			return { duration: 6, taps: 4 };
		case Rarity.Rare:
			return { duration: 5, taps: 6 };
		case Rarity.Epic:
			return { duration: 4, taps: 8 };
		case Rarity.Legendary:
			return { duration: 3, taps: 10 };
	}
};

// Hook every wild horse that already exists at the moment this script runs.
CollectionService.GetTagged(WILD_HORSE_TAG_NAME).forEach(hookHorsePrompt);

// Hook every wild horse that gets spawned later, on an ongoing basis.
CollectionService.GetInstanceAddedSignal(WILD_HORSE_TAG_NAME).Connect(hookHorsePrompt);

// Listen if button clicked
Remotes.BondTap.OnServerEvent.Connect((player) => {
	const session = activeSessions.get(player);
	if (session === undefined) return;

	session.tapsLanded += 1;
});
