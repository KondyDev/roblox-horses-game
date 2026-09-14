export enum Rarity {
  Common = "Common",
  Rare = "Rare",
  Epic = "Epic",
  Legendary = "Legendary",
}

export interface StatRange {
  min: number;
  max: number;
}

export interface BreedDefinition {
  id: string;
  displayName: string;
  flavor: string;
  rarity: Rarity;
  stats: {
    speed: StatRange;
    stamina: StatRange;
    temperament: StatRange;
    jump: StatRange;
  };
  color: Color3;
}

export interface HorseStats {
  speed: number;
  stamina: number;
  temperament: number;
  jump: number;
}
