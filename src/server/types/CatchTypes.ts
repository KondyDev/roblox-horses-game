import { BreedDefinition } from "shared/types/HorseTypes";

export interface CatchSession {
	horse: Instance;
	breed: BreedDefinition;
	resolve: () => boolean;
}
