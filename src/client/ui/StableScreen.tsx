import React, { useEffect, useState } from "@rbxts/react";
import { Remotes } from "shared/remotes/Remotes";
import { HorseInstanceData } from "shared/types/HorseTypes";
import HorseCard from "./HorseCard";
import { UserInputService } from "@rbxts/services";

type ViewMode = "list" | "grid";

const StableScreen = () => {
	const [horses, setHorses] = useState<HorseInstanceData[]>([]);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [viewMode, setViewMode] = useState<ViewMode>("grid");
	const [selectedHorse, setSelectedHorse] = useState<HorseInstanceData | undefined>(undefined);

	useEffect(() => {
		const dataConnection = Remotes.PlayerHorsesUpdated.OnClientEvent.Connect((updatedHorses) =>
			setHorses(updatedHorses),
		);

		const inputConnection = UserInputService.InputBegan.Connect((input, gameProcessed) => {
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
			Size={new UDim2(0, 900, 0, 550)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BackgroundColor3={Color3.fromRGB(30, 30, 34)}
		>
			<uicorner CornerRadius={new UDim(0, 12)} />
			<uipadding
				PaddingTop={new UDim(0, 16)}
				PaddingBottom={new UDim(0, 16)}
				PaddingLeft={new UDim(0, 16)}
				PaddingRight={new UDim(0, 16)}
			/>

			{/* LEFT: list/grid panel */}
			<frame Size={new UDim2(0, 560, 1, 0)} BackgroundTransparency={1}>
				<textbutton
					Size={new UDim2(0, 100, 0, 32)}
					BackgroundColor3={Color3.fromRGB(60, 60, 68)}
					Text={viewMode === "grid" ? "Switch to list" : "Switch to grid"}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					Font={Enum.Font.Gotham}
					TextSize={14}
					Event={{
						MouseButton1Click: () => setViewMode((prev) => (prev === "grid" ? "list" : "grid")),
					}}
				>
					<uicorner CornerRadius={new UDim(0, 6)} />
				</textbutton>

				<scrollingframe
					Size={new UDim2(1, 0, 1, -40)}
					Position={new UDim2(0, 0, 0, 40)}
					BackgroundTransparency={1}
					CanvasSize={new UDim2(0, 0, 0, 0)}
					AutomaticCanvasSize={Enum.AutomaticSize.Y}
					ScrollBarThickness={6}
				>
					<uipadding PaddingTop={new UDim(0, 4)} PaddingLeft={new UDim(0, 4)} PaddingRight={new UDim(0, 4)} />
					{viewMode === "grid" ? (
						<uigridlayout CellSize={new UDim2(0, 170, 0, 90)} CellPadding={new UDim2(0, 8, 0, 8)} />
					) : (
						<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 6)} />
					)}
					{horses.map((horse) => (
						<HorseCard
							key={horse.id}
							horse={horse}
							onSelect={() => setSelectedHorse(horse)}
							isSelected={selectedHorse?.id === horse.id}
						/>
					))}
				</scrollingframe>
			</frame>

			{/* RIGHT: detail panel */}
			<frame
				Size={new UDim2(0, 290, 1, 0)}
				Position={new UDim2(1, 0, 0, 0)}
				AnchorPoint={new Vector2(1, 0)}
				BackgroundColor3={Color3.fromRGB(24, 24, 28)}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
				<frame>
					<uicorner CornerRadius={new UDim(0, 10)} />
					{/* <HorseInfoPanel horse={selectedHorse} /> */}
				</frame>
			</frame>
		</frame>
	);
};

export default StableScreen;
