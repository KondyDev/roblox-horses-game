import { AuraTier } from "shared/types/HorseTypes";

export interface AuraStyle {
	colors: ColorSequence;
	accent: Color3;
	rotationSpeed: number; // degres per second
	pulseSpeed: number; // pulses per second
	pulseAmount: number; // how far stroke transparency swings (0-1)
}

export const AURA_STYLES: Partial<Record<AuraTier, AuraStyle>> = {
	[AuraTier.Shiny]: {
		colors: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(255, 200, 60)),
			new ColorSequenceKeypoint(0.5, Color3.fromRGB(255, 245, 180)),
			new ColorSequenceKeypoint(1, Color3.fromRGB(255, 200, 60)),
		]),
		accent: Color3.fromRGB(255, 220, 100),
		rotationSpeed: 40,
		pulseSpeed: 0.5,
		pulseAmount: 0.25,
	},
	[AuraTier.Mystic]: {
		colors: new ColorSequence([
			new ColorSequenceKeypoint(0, Color3.fromRGB(255, 80, 200)),
			new ColorSequenceKeypoint(0.33, Color3.fromRGB(80, 220, 255)),
			new ColorSequenceKeypoint(0.66, Color3.fromRGB(150, 80, 255)),
			new ColorSequenceKeypoint(1, Color3.fromRGB(255, 80, 200)),
		]),
		accent: Color3.fromRGB(255, 80, 200),
		rotationSpeed: 80,
		pulseSpeed: 1,
		pulseAmount: 0.45,
	},
};
