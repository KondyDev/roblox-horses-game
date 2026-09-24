import { HorseInstanceData } from "shared/types/HorseTypes";

export interface HorseCardProps {
	horse: HorseInstanceData;
	onSelect: () => void;
	isSelected: boolean;
}
