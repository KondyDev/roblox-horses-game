import { ReplicatedStorage, RunService } from "@rbxts/services";
import { REMOTE_NAMES } from "./RemoteNames";

const getOrCreateRemote = (name: string): RemoteEvent => {
	if (!RunService.IsServer()) return ReplicatedStorage.WaitForChild(name) as RemoteEvent;

	let remote = ReplicatedStorage.FindFirstChild(name) as RemoteEvent | undefined;

	if (remote === undefined) {
		remote = new Instance("RemoteEvent");
		remote.Name = name;
		remote.Parent = ReplicatedStorage;
	}

	return remote;
};

export const Remotes = {
	BondMinigameStart: getOrCreateRemote(REMOTE_NAMES.BondMinigameStart),
	BondTap: getOrCreateRemote(REMOTE_NAMES.BondTap),
};
