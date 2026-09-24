import { DataStoreService, Players } from "@rbxts/services";
import { PlayerHorseData } from "./types/PlayerTypes";
import { HorseInstanceData } from "shared/types/HorseTypes";
import { Remotes } from "shared/remotes/Remotes";

const DEFAULT_DATA: PlayerHorseData = { horses: [], coins: 0 };

const horseStore = DataStoreService.GetDataStore("PlayerHorseData_v1");
const playerData = new Map<Player, PlayerHorseData>();

export const loadPlayerData = (player: Player) => {
	let data: PlayerHorseData | undefined;

	const [success, result] = pcall(() => horseStore.GetAsync(tostring(player.UserId)));
	if (success && result !== undefined) data = result as PlayerHorseData;
	else if (!success) warn(`Failed to load data for ${player.Name}: ${result}`);

	playerData.set(player, data ?? { horses: [], coins: DEFAULT_DATA.coins });

	const loaded = playerData.get(player)!;
	Remotes.PlayerHorsesUpdated.FireClient(player, loaded.horses);
};

export const savePlayerData = (player: Player) => {
	const data = playerData.get(player);
	if (data === undefined) return;

	const [success, err] = pcall(() => horseStore.SetAsync(tostring(player.UserId), data));
	if (!success) warn(`Failed to save data for ${player.Name}: ${err}`);
};

export const addCaughtHorse = (player: Player, horse: HorseInstanceData) => {
	const data = playerData.get(player);
	if (data === undefined) return;

	data.horses.push(horse);
};

export const getPlayerData = (player: Player): PlayerHorseData | undefined => {
	return playerData.get(player);
};

Players.PlayerAdded.Connect(loadPlayerData);

Players.PlayerRemoving.Connect((player) => {
	savePlayerData(player);
	playerData.delete(player);
});

Players.PlayerRemoving.Connect((player) => {
	savePlayerData(player);
	playerData.delete(player);
});

task.spawn(() => {
	for (;;) {
		task.wait(180); // save every 3 minutes
		for (const [player] of playerData) savePlayerData(player);
	}
});
