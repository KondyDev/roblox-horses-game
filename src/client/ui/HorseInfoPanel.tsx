import React, { useEffect, useRef } from "@rbxts/react";
import { BREED_DATA } from "shared/data/BreedData";
import { AuraTier, HorseInstanceData } from "shared/types/HorseTypes";
import { RARITY_COLORS } from "./rarityColors";

const HorseInfoPanel = ({ horse }: { horse: HorseInstanceData | undefined }) => {
	const viewportRef = useRef<ViewportFrame>();

	useEffect(() => {
		const viewport = viewportRef.current;
		if (viewport === undefined || horse === undefined) return;

		viewport.ClearAllChildren();

		viewport.Ambient = Color3.fromRGB(150, 150, 150);
		viewport.LightColor = Color3.fromRGB(255, 255, 255);
		viewport.LightDirection = new Vector3(-1, -1, -1);

		// Camera setup
		const camera = new Instance("Camera");
		camera.Parent = viewport;
		viewport.CurrentCamera = camera;

		// --- PLACEHOLDER ---
		const placeholder = new Instance("Part");
		placeholder.Size = new Vector3(2, 3, 4);
		placeholder.Color = horse.color;
		placeholder.Anchored = true;
		placeholder.Position = new Vector3(0, 0, 0);
		placeholder.Parent = viewport;

		camera.CFrame = CFrame.lookAt(new Vector3(5, 3, 5), placeholder.Position);
		// --- end placeholder ---

		return () => viewport.ClearAllChildren();
	}, [horse?.id]);

	if (horse === undefined) {
		return (
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				<textlabel
					Size={new UDim2(1, 0, 0, 40)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Text="Select a horse to view details"
					TextColor3={Color3.fromRGB(150, 150, 155)}
					Font={Enum.Font.Gotham}
					TextSize={14}
				/>
			</frame>
		);
	}

	const breed = BREED_DATA[horse.breedId];
	const rarityColor = RARITY_COLORS[breed.rarity];

	return (
		<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
			<uipadding
				PaddingRight={new UDim(0, 12)}
				PaddingLeft={new UDim(0, 12)}
				PaddingTop={new UDim(0, 12)}
				PaddingBottom={new UDim(0, 12)}
			/>
			<uilistlayout FillDirection={Enum.FillDirection.Vertical} Padding={new UDim(0, 10)} />

			<viewportframe
				ref={viewportRef}
				Size={new UDim2(1, 0, 0, 180)}
				BackgroundColor3={Color3.fromRGB(15, 15, 18)}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
			</viewportframe>

			<textlabel
				Size={new UDim2(1, 0, 0, 26)}
				BackgroundTransparency={1}
				Text={breed.displayName}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextXAlignment={Enum.TextXAlignment.Left}
				Font={Enum.Font.GothamBold}
				TextSize={20}
			/>

			<frame Size={new UDim2(1, 0, 0, 20)} BackgroundTransparency={1}>
				<uilistlayout FillDirection={Enum.FillDirection.Horizontal} Padding={new UDim(0, 10)} />
				<textlabel
					AutomaticSize={Enum.AutomaticSize.X}
					Size={new UDim2(0, 0, 1, 0)}
					BackgroundTransparency={1}
					Text={breed.rarity}
					TextColor3={rarityColor}
					Font={Enum.Font.GothamBold}
					TextSize={14}
				/>
				{horse.auraTier !== AuraTier.None && (
					<textlabel
						AutomaticSize={Enum.AutomaticSize.X}
						Size={new UDim2(0, 0, 1, 0)}
						BackgroundTransparency={1}
						Text={`✦ ${horse.auraTier}`}
						TextColor3={
							horse.auraTier === AuraTier.Mystic
								? Color3.fromRGB(255, 80, 200)
								: Color3.fromRGB(255, 220, 100)
						}
						Font={Enum.Font.GothamBold}
						TextSize={14}
					/>
				)}
			</frame>

			<StatBar label="Speed" value={horse.stats.speed} />
			<StatBar label="Stamina" value={horse.stats.stamina} />
			<StatBar label="Temperament" value={horse.stats.temperament} />
			<StatBar label="Jump" value={horse.stats.jump} />
		</frame>
	);
};

const StatBar = ({ label, value }: { label: string; value: number }) => {
	const maxStat = 10; // adjust when change

	return (
		<frame Size={new UDim2(1, 0, 0, 34)} BackgroundTransparency={1}>
			<textlabel
				Size={new UDim2(1, 0, 0, 16)}
				BackgroundTransparency={1}
				Text={`${label}  ${value}`}
				TextColor3={Color3.fromRGB(200, 200, 205)}
				TextXAlignment={Enum.TextXAlignment.Left}
				Font={Enum.Font.Gotham}
				TextSize={13}
			/>
			<frame
				Size={new UDim2(1, 0, 0, 8)}
				Position={new UDim2(0, 0, 0, 20)}
				BackgroundColor3={Color3.fromRGB(50, 50, 55)}
			>
				<uicorner CornerRadius={new UDim(0, 4)} />
				<frame
					Size={new UDim2(math.clamp(value / maxStat, 0, 1), 0, 1, 0)}
					BackgroundColor3={Color3.fromRGB(100, 170, 255)}
				>
					<uicorner CornerRadius={new UDim(0, 4)} />
				</frame>
			</frame>
		</frame>
	);
};

export default HorseInfoPanel;
