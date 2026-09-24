import React from "@rbxts/react";
import { BREED_DATA } from "shared/data/BreedData";
import { AuraTier } from "shared/types/HorseTypes";
import { RARITY_COLORS } from "./rarityColors";
import { HorseCardProps } from "client/types/Horse";

const HorseCard = ({ horse, onSelect, isSelected }: HorseCardProps) => {
	const breed = BREED_DATA[horse.breedId];
	const rarityColor = RARITY_COLORS[breed.rarity];

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
			<frame Size={new UDim2(0, 50, 0, 50)} BackgroundColor3={horse.color}>
				<uicorner CornerRadius={new UDim(0, 6)} />
			</frame>

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
