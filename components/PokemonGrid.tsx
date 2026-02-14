"use client";

import { useState } from "react";
import Image from "next/image";
import { TYPE_COLORS, DEFAULT_COLOR } from "@/lib/constants";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonGrid({ pokemons }: { pokemons: Pokemon[] }) {
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica del Easter Egg
  const isEasterEggActive = searchTerm.trim().toLowerCase() === "raquel";

  // Filtramos la lista normal
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePokemonClick = async (pokemon: Pokemon) => {
    const id = pokemon.url.split("/")[6];
    
    setSelectedPokemon({
      id,
      name: pokemon.name,
      types: [],
      stats: [],
      isLoading: true,
    });

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const details = await res.json();
      
      setSelectedPokemon((prev: any) => ({
        ...prev,
        ...details,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error", error);
    }
  };

  const mainType = selectedPokemon?.types[0]?.type.name;
  const modalBgColor = TYPE_COLORS[mainType] || DEFAULT_COLOR;

  return (
    <>
      {/* --- EASTER EGG DE RAQUEL --- */}
      {isEasterEggActive && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-900/40 backdrop-blur-xl animate-in fade-in duration-700">
            {/* Corazón Latiendo */}
            <div className="relative">
                {/* Brillo detrás del corazón */}
                <div className="absolute inset-0 bg-red-500 blur-[100px] opacity-50 animate-pulse"></div>
                <div className="text-[15rem] md:text-[20rem] animate-pulse drop-shadow-[0_0_30px_rgba(255,0,0,0.8)] filter transition-all duration-500 hover:scale-110 cursor-default select-none">
                    ❤️
                </div>
            </div>
            
            {/* Texto Opcional (puedes borrarlo si solo quieres el corazón) */}
            <h2 className="text-white text-5xl md:text-7xl font-black tracking-widest mt-8 drop-shadow-lg animate-bounce">
                Te amo, feliz San Valentín
            </h2>
        </div>
      )}

      {/* --- BARRA DE BÚSQUEDA --- */}
      <div className="max-w-xl mx-auto mb-10 relative group z-20">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Busca tu Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-full 
                     bg-white/40 backdrop-blur-xl border border-white/60 
                     shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
                     focus:shadow-[0_10px_30px_rgba(236,72,153,0.3)] 
                     focus:bg-white/60 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200
                     text-gray-700 placeholder-gray-500 font-medium transition-all duration-300"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* --- GRID (Solo se muestra si NO está activado el Easter Egg) --- */}
      {!isEasterEggActive && (
        <>
            {filteredPokemons.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredPokemons.map((pokemon) => {
                    const id = pokemon.url.split("/")[6];
                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

                    return (
                    <div
                        key={id}
                        onClick={() => handlePokemonClick(pokemon)}
                        className="group relative bg-white/40 backdrop-blur-md rounded-2xl p-4 cursor-pointer 
                                border border-white/50 hover:border-blue-300/50 
                                shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.2)]
                                transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-in fade-in zoom-in duration-300"
                    >
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/40 to-white/10 rounded-full blur-xl opacity-50 group-hover:scale-150 transition-transform duration-500" />
                        
                        <div className="relative w-full aspect-square mb-4 z-10">
                        <Image
                            src={imageUrl}
                            alt={pokemon.name}
                            fill
                            className="object-contain drop-shadow-md group-hover:drop-shadow-2xl group-hover:scale-110 transition-all duration-300"
                            loading="lazy"
                        />
                        </div>
                        <div className="text-center relative z-10">
                        <span className="block text-gray-500 text-sm font-mono font-bold tracking-wider">#{id.padStart(3, '0')}</span>
                        <h3 className="font-extrabold text-xl capitalize text-gray-800 mt-1 group-hover:text-blue-600 transition-colors">
                            {pokemon.name}
                        </h3>
                        </div>
                    </div>
                    );
                })}
                </div>
            ) : (
                <div className="text-center py-20 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30">
                    <p className="text-6xl mb-4">🥺</p>
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">No encontramos a "{searchTerm}"</h3>
                    <p className="text-gray-500">Intenta buscar por otro nombre.</p>
                </div>
            )}
        </>
      )}

      {/* --- MODAL WIDESCREEN --- */}
      {selectedPokemon && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={() => setSelectedPokemon(null)}
        >
          <div 
            className="bg-white/60 backdrop-blur-2xl border border-white/50 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 grid grid-cols-1 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPokemon(null)}
              className="absolute top-4 right-4 z-50 bg-white/30 hover:bg-white/50 border border-white/40 rounded-full p-2 transition-all text-gray-600 backdrop-blur-md"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>

            {/* COLUMNA IZQUIERDA */}
            <div className={`${modalBgColor} bg-opacity-90 p-8 flex flex-col items-center justify-center relative overflow-hidden text-white min-h-[350px]`}>
               <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
               <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full blur-2xl mix-blend-multiply"></div>

               <div className="relative z-10 text-center w-full">
                  <div className="flex justify-between items-center w-full absolute top-0 px-2 opacity-70 mix-blend-overlay">
                     <span className="font-bold font-mono text-xl">#{selectedPokemon.id.toString().padStart(3, '0')}</span>
                     <span className="font-bold uppercase tracking-widest text-xs">Pokédex</span>
                  </div>

                  <div className="relative w-64 h-64 mx-auto mt-8 filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500">
                    <Image 
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
                      alt={selectedPokemon.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>

                  <h2 className="text-5xl md:text-6xl font-black capitalize mt-6 tracking-tight drop-shadow-md text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
                      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                    {selectedPokemon.name}
                  </h2>

                  <div className="flex justify-center gap-3 mt-4">
                    {!selectedPokemon.isLoading && selectedPokemon.types.map((t: any) => (
                      <span key={t.type.name} className="px-5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 font-bold capitalize text-sm shadow-lg text-white">
                        {t.type.name}
                      </span>
                    ))}
                  </div>
               </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="p-8 md:p-10 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-white/40 mix-blend-soft-light z-0"></div>

              <div className="relative z-10">
                {selectedPokemon.isLoading ? (
                  <div className="space-y-6 animate-pulse">
                     <div className="h-8 bg-gray-200/50 rounded w-3/4"></div>
                     <div className="h-8 bg-gray-200/50 rounded w-1/2"></div>
                     <div className="h-48 bg-gray-200/50 rounded-xl"></div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-bold text-xl mb-5 flex items-center gap-2 text-gray-800">
                        Estadísticas Base
                      </h3>
                      <div className="space-y-4">
                        {selectedPokemon.stats.map((s: any) => (
                           <div key={s.stat.name} className="flex items-center gap-4 text-sm">
                              <span className="w-24 font-bold text-gray-600 capitalize text-right text-xs tracking-wider">
                                {s.stat.name.replace('special-', 'sp. ')}
                              </span>
                              <div className="flex-1 h-3 bg-white/60 rounded-full overflow-hidden shadow-inner border border-white/50">
                                 <div 
                                    className={`h-full rounded-full ${modalBgColor} bg-opacity-80 shadow-sm`} 
                                    style={{width: `${Math.min(s.base_stat, 100)}%`}}
                                 ></div>
                              </div>
                              <span className="w-8 font-bold text-gray-800 text-right">{s.base_stat}</span>
                           </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-white/40 rounded-2xl border border-white/60 text-center shadow-sm hover:bg-white/60 transition-colors">
                          <span className="block text-3xl font-black text-gray-800">{selectedPokemon.height / 10}m</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Altura</span>
                       </div>
                       <div className="p-4 bg-white/40 rounded-2xl border border-white/60 text-center shadow-sm hover:bg-white/60 transition-colors">
                          <span className="block text-3xl font-black text-gray-800">{selectedPokemon.weight / 10}kg</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Peso</span>
                       </div>
                    </div>

                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
