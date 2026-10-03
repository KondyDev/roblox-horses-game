import React, { useEffect, useRef } from "@rbxts/react";
import { BREED_DATA } from "shared/data/BreedData";
import { AuraTier, HorseInstanceData } from "shared/types/HorseTypes";
import { RARITY_COLORS } from "./rarityColors";
import { ReplicatedStorage } from "@rbxts/services";
import { frameHorseInViewport, prepareHorseModel } from "shared/utils/HorseVisuals";
import { useAuraAnimation } from "client/hooks/useAuraAnimation";
import { AURA_STYLES } from "./auraStyles";

const HorseInfoPanel = ({ horse }: { horse: HorseInstanceData | undefined }) => {
	const viewportRef = useRef<ViewportFrame>();
	const auraStyle = horse !== undefined ? AURA_STYLES[horse.auraTier] : undefined;
	const strokeRef = useRef<UIStroke>();
	const gradientRef = useRef<UIGradient>();
	useAuraAnimation(gradientRef, strokeRef, auraStyle);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (viewport === undefined || horse === undefined) return;

		// viewport.ClearAllChildren();

		viewport.Ambient = Color3.fromRGB(150, 150, 150);
		viewport.LightColor = Color3.fromRGB(255, 255, 255);
		viewport.LightDirection = new Vector3(-1, -1, -1);

		// Camera setup
		const camera = new Instance("Camera");
		camera.Parent = viewport;
		viewport.CurrentCamera = camera;

		const horseFolder = ReplicatedStorage.FindFirstChild("HorsesModels");
		const horseTemplate = horseFolder?.FindFirstChild(horse.breedId) as Model | undefined;

		if (horseTemplate === undefined) {
			warn(`Missing horse model for breed: ${horse.breedId}`);
			camera.Destroy();
			return;
		}

		const horseModel = prepareHorseModel(horseTemplate, horse.color);
		horseModel.Parent = viewport;
		horseModel.PivotTo(new CFrame(Vector3.zero));

		frameHorseInViewport(horseModel, camera);

		return () => {
			horseModel.Destroy();
			camera.Destroy();
		};
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
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				Padding={new UDim(0, 10)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>

			<viewportframe
				ref={viewportRef}
				Size={new UDim2(1, 0, 0, 180)}
				BackgroundColor3={Color3.fromRGB(15, 15, 18)}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
				<uistroke ref={strokeRef} Color={Color3.fromRGB(255, 255, 255)} Thickness={3}>
					{auraStyle !== undefined && <uigradient ref={gradientRef} Color={auraStyle.colors} />}
				</uistroke>
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
				{auraStyle !== undefined && (
					<frame AutomaticSize={Enum.AutomaticSize.X} Size={new UDim2(0, 0, 1, 0)} BackgroundTransparency={1}>
						<uilistlayout
							FillDirection={Enum.FillDirection.Horizontal}
							VerticalAlignment={Enum.VerticalAlignment.Center}
							Padding={new UDim(0, 4)}
						/>
						<imagelabel
							Size={new UDim2(0, 14, 0, 14)}
							BackgroundTransparency={1}
							Image="rbxassetid://112585867598001"
							ImageColor3={auraStyle.accent}
						/>
						<textlabel
							AutomaticSize={Enum.AutomaticSize.X}
							Size={new UDim2(0, 0, 1, 0)}
							BackgroundTransparency={1}
							Text={horse.auraTier}
							TextColor3={auraStyle.accent}
							Font={Enum.Font.GothamBold}
							TextSize={14}
						/>
					</frame>
				)}
			</frame>

			<StatBar label="Speed" value={horse.stats.speed} />
			<StatBar label="Stamina" value={horse.stats.stamina} />
			<StatBar label="Temperament" value={horse.stats.temperament} />
			<StatBar label="Jump" value={horse.stats.jump} />

			<textbutton
				Size={new UDim2(1, 0, 0, 32)}
				BackgroundColor3={Color3.fromRGB(60, 60, 68)}
				Text="Summon Horse"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Font={Enum.Font.Gotham}
				TextSize={14}
			>
				<uicorner CornerRadius={new UDim(0, 10)} />
			</textbutton>
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
