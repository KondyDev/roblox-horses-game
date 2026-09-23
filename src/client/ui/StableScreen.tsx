import React, { useEffect, useState } from "@rbxts/react";
import { Remotes } from "shared/remotes/Remotes";
import { HorseInstanceData } from "shared/types/HorseTypes";
import HorseCard from "./HorseCard";
import { UserInputService } from "@rbxts/services";

const StableScreen = () => {
	const [horses, setHorses] = useState<HorseInstanceData[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		const dataConnection = Remotes.PlayerHorsesUpdated.OnClientEvent.Connect((updatedHorses) => {
			setHorses(updatedHorses);
		});

		const inputConnection = UserInputService.InputBegan.Connect((input, gameProcessed) => {
			print("toggle fired:", isOpen, input.UserInputType, input.KeyCode);
			if (gameProcessed) return; // ignore if typing in a textbox etc.
			if (input.KeyCode === Enum.KeyCode.B) setIsOpen((prev) => !prev); // TODO: maybe change input
		});

		return () => {
			dataConnection.Disconnect();
			inputConnection.Disconnect();
		};
	}, []);

	if (!isOpen) return undefined;

	return (
		<frame
			Size={new UDim2(0, 400, 0, 500)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
		>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 4)} />
			{horses.map((horse) => (
				<HorseCard key={horse.id} horse={horse} />
			))}
		</frame>
	);
};

export default StableScreen;
