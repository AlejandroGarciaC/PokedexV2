import Link from "next/link";
import { REGIONS } from "@/lib/constants";
import PokemonGrid from "@/components/PokemonGrid";
// 1. Importamos la fuente "Luckiest Guy"
import { Luckiest_Guy } from "next/font/google";

// 2. La configuramos
const pokemonFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

async function getPokemons(offset: number, limit: number) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();
  return data.results;
}

interface Props {
  params: Promise<{ name: string }>;
}

export default async function RegionPage({ params }: Props) {
  const resolvedParams = await params;
  const regionName = resolvedParams.name;
  
  const regionData = REGIONS.find(
    (r) => r.name.toLowerCase() === regionName.toLowerCase()
  );

  if (!regionData) {
    return <div className="text-center p-10">Región no encontrada</div>;
  }

  const pokemons = await getPokemons(regionData.offset, regionData.limit);

  return (
    <div className="min-h-screen p-8 pb-20">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-500 hover:text-blue-700 mb-8 inline-flex items-center font-bold transition-colors">
          &larr; Volver a Regiones
        </Link>
        
        {/* --- TÍTULO ESTILO POKÉMON CLÁSICO --- */}
        <div className="text-center mb-12 relative z-10">
            <h1 
                // 3. Aplicamos la clase de la fuente + colores oficiales
                className={`${pokemonFont.className} text-6xl md:text-8xl tracking-wider text-yellow-400 drop-shadow-xl relative z-10 uppercase`}
                style={{ 
                    // Borde azul icónico
                    WebkitTextStroke: '4px #2563eb', // Azul fuerte (blue-600)
                    paintOrder: 'stroke fill'
                }}
            >
              {regionName}
            </h1>
            
            {/* Sombra de apoyo para efecto 3D */}
            <h1 
                className={`${pokemonFont.className} text-6xl md:text-8xl tracking-wider text-blue-900 absolute top-2 left-0 right-0 z-0 opacity-40 blur-sm uppercase select-none`}
                aria-hidden="true"
            >
              {regionName}
            </h1>
        </div>

        <PokemonGrid pokemons={pokemons} />
      </div>
    </div>
  );
}