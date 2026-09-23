import React from "@rbxts/react";
import { BREED_DATA } from "shared/data/BreedData";
import { AuraTier, HorseInstanceData } from "shared/types/HorseTypes";
import { RARITY_COLORS } from "./rarityColors";

const HorseCard = ({ horse }: { horse: HorseInstanceData }) => {
	const breed = BREED_DATA[horse.breedId];
	const rarityColor = RARITY_COLORS[breed.rarity];

	return (
		<frame Size={new UDim2(1, 0, 0, 80)} BackgroundColor3={Color3.fromRGB(40, 40, 45)}>
			<uicorner CornerRadius={new UDim(0, 8)} />
			<uistroke Color={rarityColor} Thickness={2} />

			{/* coat swatch */}
			<frame Size={new UDim2(0, 50, 0, 50)} Position={new UDim2(0, 10, 0.5, -25)} BackgroundColor3={horse.color}>
				<uicorner CornerRadius={new UDim(0, 6)} />
			</frame>

			{/* name & rarity */}
			<textlabel
				Size={new UDim2(1, -140, 0, 24)}
				Position={new UDim2(0, 70, 0, 10)}
				BackgroundTransparency={1}
				Text={breed.displayName}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextXAlignment={Enum.TextXAlignment.Left}
				Font={Enum.Font.GothamBold}
				TextSize={18}
			/>
			<textlabel
				Size={new UDim2(1, -140, 0, 18)}
				Position={new UDim2(0, 70, 0, 36)}
				BackgroundTransparency={1}
				Text={breed.rarity}
				TextColor3={rarityColor}
				TextXAlignment={Enum.TextXAlignment.Left}
				Font={Enum.Font.Gotham}
				TextSize={14}
			/>

			{/* aura badge */}
			{horse.auraTier !== AuraTier.None && (
				<textlabel
					Size={new UDim2(0, 60, 0, 20)}
					Position={new UDim2(1, -70, 0, 10)}
					BackgroundColor3={
						horse.auraTier === AuraTier.Mystic
							? Color3.fromRGB(255, 80, 200)
							: Color3.fromRGB(255, 240, 120)
					}
					Text={horse.auraTier}
					TextColor3={Color3.fromRGB(20, 20, 20)}
					Font={Enum.Font.GothamBold}
					TextSize={12}
				>
					<uicorner CornerRadius={new UDim(0, 4)} />
				</textlabel>
			)}
		</frame>
	);
};

export default HorseCard;
