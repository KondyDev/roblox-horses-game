import { CollectionService, ReplicatedStorage, Workspace } from "@rbxts/services";
import { BREED_DATA } from "shared/data/BreedData";
import { BreedDefinition } from "shared/types/HorseTypes";
import Object from "@rbxts/object-utils";
import { FOLDER_NAMES, TAG_NAMES } from "shared/Constants";
import { prepareHorseModel } from "shared/utils/HorseVisuals";

const HORSE_SIZE = new Vector3(6, 16, 18); // koń ~4.4 x 13 x 16, z zapasem
const MAX_SPAWN_ATTEMPTS = 10;

// POSITION -----------------------------------------------------------
const spawnPoints: Vector3[] = [
	new Vector3(0, 5, 0),
	new Vector3(10, 5, 0),
	new Vector3(0, 5, 10),
	new Vector3(10, 5, 10),
	new Vector3(5, 5, 15),
	new Vector3(0, 5, 20),
	new Vector3(20, 5, 0),
	new Vector3(20, 5, 10),
	new Vector3(15, 5, 20),
	new Vector3(-10, 5, 5),
	new Vector3(-10, 5, 15),
	new Vector3(15, 5, -5),
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
	overlapParams.FilterType = Enum.RaycastFilterType.Include;
	overlapParams.FilterDescendantsInstances = [getWildHorsesFolder()];

	const overlapping = Workspace.GetPartBoundsInBox(new CFrame(position), HORSE_SIZE, overlapParams);
	return overlapping.size() === 0;
};
// -----------------------------------------------------------------------

// SPAWN & CREATE --------------------------------------------------------
const createWildHorseModel = (breed: BreedDefinition, spawnPosition: Vector3): void => {
	const horsesFolder = ReplicatedStorage.FindFirstChild("HorsesModels");
	const horseTemplate = horsesFolder?.FindFirstChild(breed.id) as Model | undefined;

	if (horseTemplate === undefined) {
		warn(`Missing horse model for breed: ${breed.id}`);
		return;
	}

	const coatColor = breed.colorOptions[math.random(0, breed.colorOptions.size() - 1)];
	const horse = prepareHorseModel(horseTemplate, coatColor);
	horse.Name = breed.displayName;

	const promptAttachment = horse.FindFirstChild("Root")?.FindFirstChild("PromptAttachment");
	if (promptAttachment === undefined) {
		warn(`Horse model ${breed.id} is missing Root/PromptAttachment`);
		horse.Destroy();
		return;
	}

	horse.PivotTo(new CFrame(spawnPosition));

	const prompt = new Instance("ProximityPrompt");
	prompt.ActionText = "Bond";
	prompt.ObjectText = breed.displayName;
	prompt.MaxActivationDistance = 8;
	prompt.Parent = promptAttachment;

	horse.SetAttribute("BreedId", breed.id);
	horse.Parent = getWildHorsesFolder();
	CollectionService.AddTag(horse, TAG_NAMES.WildHorse);

	print(`Spawned ${breed.displayName} at ${spawnPosition}...`);
};

const spawnWildHorse = () => {
	const spawnPosition = pickSpawnPosition();
	if (spawnPosition === undefined) return;

	const breedIds = Object.keys(BREED_DATA);
	const randomIndex = math.random(0, breedIds.size() - 1);
	const randomBreedId = breedIds[randomIndex];
	const randomBreed = BREED_DATA[randomBreedId];

	createWildHorseModel(randomBreed, spawnPosition);
};

const getWildHorsesFolder = (): Folder => {
	let folder = Workspace.FindFirstChild(FOLDER_NAMES.WildHorses) as Folder | undefined;
	if (folder === undefined) {
		folder = new Instance("Folder");
		folder.Name = FOLDER_NAMES.WildHorses;
		folder.Parent = Workspace;
	}

	return folder as Folder;
};
// -----------------------------------------------------------------------

// Spawning Horse
task.spawn(() => {
	for (;;) {
		const wildHorsesAmount: number = CollectionService.GetTagged(TAG_NAMES.WildHorse).size();
		if (wildHorsesAmount < 10) spawnWildHorse();

		task.wait(5);
	}
});
