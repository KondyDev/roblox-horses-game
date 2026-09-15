import { Players } from "@rbxts/services";
import { Remotes } from "shared/Remotes";

const BOND_GUI_NAME = "BondGui";

Remotes.BondMinigameStart.OnClientEvent.Connect((duration, requiredTaps, breedName) => {
	print(`Bond started: ${breedName}, ${duration}s, ${requiredTaps} taps needed.`);

	const player = Players.LocalPlayer;
	const playerGui = player.WaitForChild("PlayerGui") as PlayerGui;

	const existing = playerGui.FindFirstChild(BOND_GUI_NAME);
	if (existing !== undefined) existing.Destroy();

	const screenGui = new Instance("ScreenGui");
	screenGui.Name = BOND_GUI_NAME;

	const button = new Instance("TextButton");
	button.Size = new UDim2(0, 150, 0, 60);
	button.Position = new UDim2(0.5, -75, 0.8, 0);
	button.Text = `Bond! (0 / ${requiredTaps})`;
	button.Parent = screenGui;

	screenGui.Parent = playerGui;

	task.delay(duration, () => {
		screenGui.Destroy();
	});

	let currentTap = 0;
	button.MouseButton1Click.Connect(() => {
		currentTap++;
		button.Text = `Bond! (${currentTap} / ${requiredTaps})`;
		Remotes.BondTap.FireServer();
	});
});
