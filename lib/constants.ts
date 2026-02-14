// src/lib/constants.ts

export const REGIONS = [
  { name: 'Kanto', limit: 151, offset: 0, color: 'bg-red-500' },
  { name: 'Johto', limit: 100, offset: 151, color: 'bg-yellow-500' },
  { name: 'Hoenn', limit: 135, offset: 251, color: 'bg-green-500' },
  { name: 'Sinnoh', limit: 107, offset: 386, color: 'bg-blue-500' },
  { name: 'Unova', limit: 156, offset: 493, color: 'bg-gray-800' },
  { name: 'Kalos', limit: 72, offset: 649, color: 'bg-pink-500' },
  { name: 'Alola', limit: 88, offset: 721, color: 'bg-orange-500' },
  { name: 'Galar', limit: 96, offset: 809, color: 'bg-indigo-500' },
  { name: 'Paldea', limit: 120, offset: 905, color: 'bg-purple-500' },
];

export const TYPE_COLORS: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-800",
  ghost: "bg-purple-800",
  dragon: "bg-indigo-700",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

// Color por defecto si algo falla
export const DEFAULT_COLOR = "bg-gray-700";