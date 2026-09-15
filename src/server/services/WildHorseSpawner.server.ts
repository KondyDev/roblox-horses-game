import { CollectionService, Workspace } from "@rbxts/services";
import { BREED_DATA } from "shared/data/BreedData";
import { BreedDefinition } from "shared/types/HorseTypes";
import Object from "@rbxts/object-utils";
import { WILD_HORSE_FOLDER_NAME, WILD_HORSE_TAG_NAME } from "server/TagNames";

const HORSE_SIZE = new Vector3(3, 4, 6);
const MAX_SPAWN_ATTEMPTS = 10;

// POSITION -----------------------------------------------------------
const spawnPoints: Vector3[] = [
	new Vector3(0, 3, 0),
	new Vector3(10, 3, 0),
	new Vector3(0, 3, 10),
	new Vector3(10, 3, 10),
	new Vector3(5, 3, 15),
	new Vector3(0, 3, 20),
];

const pickSpawnPosition = (): Vector3 | undefined => {
	for (let attempt = 0; attempt < MAX_SPAWN_ATTEMPTS; attempt++) {
		const randomIndex = math.random(0, spawnPoints.size() - 1);
		const candidate = spawnPoints[randomIndex];

		if (isPositionClear(candidate)) return candidate;
	}

	return undefined;
};

// TODO: na pozniej - sprawdzac granice gry, bo teraz moze tez w ziemi jakby wzgórza byly
const isPositionClear = (position: Vector3): boolean => {
	const overlapParams = new OverlapParams();
	const checkSize = HORSE_SIZE;

	const overlapping = Workspace.GetPartBoundsInBox(new CFrame(position), checkSize, overlapParams);
	return overlapping.size() === 0;
};
// -----------------------------------------------------------------------

// SPAWN & CREATE --------------------------------------------------------
const createWildHorseModel = (breed: BreedDefinition): void => {
	const horse = new Instance("Part");

	horse.Name = breed.displayName;
	horse.Position = pickSpawnPosition() || new Vector3(0, 6, 0); // TODO: bez default pozycji jak zrobie respienie na mapie randomowo
	horse.Size = HORSE_SIZE;
	horse.Color = breed.colorOptions[math.random(0, breed.colorOptions.size() - 1)];
	horse.Anchored = true;
	horse.SetAttribute("BreedId", breed.id);
	horse.Parent = getWildHorsesFolder();

	const prompt = new Instance("ProximityPrompt");
	prompt.ActionText = "Bond";
	prompt.ObjectText = breed.displayName;
	prompt.MaxActivationDistance = 8;
	prompt.Parent = horse;

	CollectionService.AddTag(horse, WILD_HORSE_TAG_NAME);
};

const spawnWildHorse = () => {
	const breedIds = Object.keys(BREED_DATA);
	const randomIndex = math.random(0, breedIds.size() - 1);
	const randomBreedId = breedIds[randomIndex];
	const randomBreed = BREED_DATA[randomBreedId];

	createWildHorseModel(randomBreed);
};

const getWildHorsesFolder = (): Folder => {
	let folder = Workspace.FindFirstChild(WILD_HORSE_FOLDER_NAME) as Folder | undefined;
	if (folder === undefined) {
		folder = new Instance("Folder");
		folder.Name = WILD_HORSE_FOLDER_NAME;
		folder.Parent = Workspace;
	}

	return folder as Folder;
};
// -----------------------------------------------------------------------

// Spawning Horse
task.spawn(() => {
	for (;;) {
		const wildHorsesAmount: number = CollectionService.GetTagged(WILD_HORSE_TAG_NAME).size();
		if (wildHorsesAmount < 10) spawnWildHorse();

		task.wait(5);
	}
});
