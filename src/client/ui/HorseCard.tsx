import React, { useEffect, useRef } from "@rbxts/react";
import { BREED_DATA } from "shared/data/BreedData";
import { RARITY_COLORS } from "./rarityColors";
import { HorseCardProps } from "client/types/Horse";
import { ReplicatedStorage } from "@rbxts/services";
import { frameHorseInViewport, prepareHorseModel } from "shared/utils/HorseVisuals";

const HorseCard = ({ horse, onSelect, isSelected }: HorseCardProps) => {
	const breed = BREED_DATA[horse.breedId];
	const rarityColor = RARITY_COLORS[breed.rarity];
	const viewportRef = useRef<ViewportFrame>();

	useEffect(() => {
		const viewport = viewportRef.current;
		if (viewport === undefined) return;

		viewport.ClearAllChildren();

		const camera = new Instance("Camera");
		camera.Parent = viewport;
		viewport.CurrentCamera = camera;

		const horseFolder = ReplicatedStorage.FindFirstChild("HorsesModels");
		const horseTemplate = horseFolder?.FindFirstChild(horse.breedId) as Model | undefined;

		if (horseTemplate === undefined) {
			warn(`Missing horse model for breed: ${horse.breedId}`);
			return;
		}

		const horseModel = prepareHorseModel(horseTemplate, horse.color);
		horseModel.Parent = viewport;
		horseModel.PivotTo(new CFrame(Vector3.zero));

		frameHorseInViewport(horseModel, camera, 2.2);

		return () => viewport.ClearAllChildren();
	}, [horse.id]);

	return (
		<textbutton
			Size={new UDim2(1, 0, 0, 80)}
			BackgroundColor3={Color3.fromRGB(40, 40, 45)}
			Text=""
			AutoButtonColor={false}
			Event={{ MouseButton1Click: onSelect }}
		>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uistroke Color={isSelected ? Color3.fromRGB(255, 255, 255) : rarityColor} Thickness={isSelected ? 3 : 2} />
			<uipadding
				PaddingTop={new UDim(0, 10)}
				PaddingBottom={new UDim(0, 10)}
				PaddingLeft={new UDim(0, 10)}
				PaddingRight={new UDim(0, 10)}
			/>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0, 10)}
			/>

			{/* coat swatch — fixed size, doesn't stretch */}
			<viewportframe
				ref={viewportRef}
				Size={new UDim2(0, 50, 0, 50)}
				BackgroundColor3={Color3.fromRGB(15, 15, 18)}
			>
				<uicorner CornerRadius={new UDim(0, 6)} />
			</viewportframe>

			{/* text column — takes remaining space automatically */}
			<frame Size={new UDim2(1, -60, 1, 0)} BackgroundTransparency={1}>
				<uilistlayout
					FillDirection={Enum.FillDirection.Vertical}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<textlabel
					Size={new UDim2(1, 0, 0, 20)}
					BackgroundTransparency={1}
					Text={breed.displayName}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextXAlignment={Enum.TextXAlignment.Left}
					TextTruncate={Enum.TextTruncate.AtEnd}
					Font={Enum.Font.GothamBold}
					TextSize={16}
				/>
				<textlabel
					Size={new UDim2(1, 0, 0, 16)}
					BackgroundTransparency={1}
					Text={breed.rarity}
					TextColor3={rarityColor}
					TextXAlignment={Enum.TextXAlignment.Left}
					Font={Enum.Font.Gotham}
					TextSize={13}
				/>
			</frame>
		</textbutton>
	);
};

export default HorseCard;
