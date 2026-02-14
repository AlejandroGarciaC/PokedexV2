import Link from "next/link";
import Image from "next/image";
import { REGIONS } from "@/lib/constants";
import { Luckiest_Guy } from "next/font/google";

const pokemonFont = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
});

// Mapa de los 3 iniciales por región
const REGION_STARTERS: Record<string, number[]> = {
  kanto: [1, 4, 7],      // Bulbasaur, Charmander, Squirtle
  johto: [152, 155, 158], // Chikorita, Cyndaquil, Totodile
  hoenn: [252, 255, 258], // Treecko, Torchic, Mudkip
  sinnoh: [387, 390, 393], // Turtwig, Chimchar, Piplup
  unova: [495, 498, 501], // Snivy, Tepig, Oshawott
  kalos: [650, 653, 656], // Chespin, Fennekin, Froakie
  alola: [722, 725, 728], // Rowlet, Litten, Popplio
  galar: [810, 813, 816], // Grookey, Scorbunny, Sobble
  paldea: [906, 909, 912], // Sprigatito, Fuecoco, Quaxly
};

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-12 flex flex-col items-center">
      
      {/* --- HERO SECTION --- */}
      <div className="text-center mb-16 relative z-10 animate-in fade-in zoom-in duration-700">
        <h1 
          className={`${pokemonFont.className} text-7xl md:text-9xl tracking-widest text-yellow-400 drop-shadow-2xl relative z-10 mb-4`}
          style={{ 
              WebkitTextStroke: '5px #2563eb', 
              paintOrder: 'stroke fill'
          }}
        >
          POKÉDEX
        </h1>
        <h1 
          className={`${pokemonFont.className} text-7xl md:text-9xl tracking-widest text-blue-900 absolute top-3 left-0 right-0 z-0 opacity-30 blur-sm select-none`}
          aria-hidden="true"
        >
          POKÉDEX
        </h1>
        <p className="text-xl text-slate-600 font-bold bg-white/60 backdrop-blur-sm py-2 px-6 rounded-full inline-block shadow-sm">
          Selecciona una región para comenzar tu aventura
        </p>
      </div>

      {/* --- GRID DE REGIONES --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl z-10">
        {REGIONS.map((region) => {
          // --- CORRECCIÓN AQUÍ ---
          // Convertimos el nombre de la región a minúsculas antes de buscar en el diccionario
          const starters = REGION_STARTERS[region.name.toLowerCase()] || [];

          return (
            <Link 
              key={region.name} 
              href={`/region/${region.name}`}
              className="group relative block h-full" // block h-full asegura que el link ocupe todo el espacio
            >
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2rem] p-6 
                            shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                            hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] 
                            hover:bg-white/60 hover:-translate-y-2 transition-all duration-300
                            flex flex-col items-center h-full min-h-[300px] overflow-hidden"
              >
                {/* Fondo brillante al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/10 group-hover:to-purple-400/10 transition-all duration-500 rounded-[2rem]"></div>

                {/* Título de la Región */}
                <h2 
                  className={`${pokemonFont.className} text-4xl text-slate-700 mb-2 group-hover:text-blue-600 transition-colors uppercase relative z-10 drop-shadow-sm text-center`}
                  style={{ letterSpacing: '2px' }}
                >
                  {region.name}
                </h2>

                {/* Trío de Iniciales */}
                <div className="flex justify-center items-end gap-2 w-full mt-auto relative z-10 pb-4 h-40">
                  {starters.length > 0 ? (
                    starters.map((id, index) => (
                      <div 
                        key={id} 
                        className={`relative transition-transform duration-500 ease-out
                                    ${index === 1 ? 'w-28 h-28 z-20 -mb-2 group-hover:scale-125' : 'w-20 h-20 z-10 opacity-90 group-hover:scale-110'}
                                    group-hover:-translate-y-4
                        `}
                      >
                        <Image
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                          alt="Starter Pokemon"
                          fill
                          className="object-contain drop-shadow-md"
                          sizes="(max-width: 768px) 100px, 150px"
                          priority // Carga prioritaria para que aparezcan rápido
                        />
                      </div>
                    ))
                  ) : (
                    // Fallback por si la región no tiene starters definidos (evita que se vea vacío)
                    <div className="text-gray-400 text-sm font-bold animate-pulse">
                        Cargando Pokémon...
                    </div>
                  )}
                </div>

                {/* Botón CTA */}
                <div className="mt-4 px-6 py-2 bg-white/50 rounded-full text-xs font-bold text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm relative z-20">
                  EXPLORAR &rarr;
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <footer className="mt-20 text-slate-400 text-sm font-medium z-10 pb-10">
        Alejandro García - PokeAPI
      </footer>
    </main>
  );
}