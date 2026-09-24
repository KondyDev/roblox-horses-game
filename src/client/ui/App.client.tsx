import React, { StrictMode } from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";
import { GuiService, Players } from "@rbxts/services";
import StableScreen from "./StableScreen";

GuiService.AutoSelectGuiEnabled = false;
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.ResetOnSpawn = false;
screenGui.Parent = playerGui;

const root = createRoot(screenGui);
root.render(
	<StrictMode>
		<StableScreen />
	</StrictMode>,
);
