<template>
  <div>
    <h1 class="text-4xl font-bold mb-6 text-center">Pokédex</h1>
    <div class="mb-6 flex flex-col md:flex-row gap-4">
      <input v-model="search" placeholder="Keresés név, típus vagy Pokédex szám alapján" class="border p-2 rounded w-full md:w-1/2" />
      <select v-model="typeFilter" class="border p-2 rounded w-full md:w-1/4">
        <option value="">Összes típus</option>
        <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PokemonCard
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PokemonCard from '../components/PokemonCard.vue'

const pokemons = ref([
  {
    id: 4,
    name: 'Charmander',
    images: [
      'https://img.pokemondb.net/artwork/charmander.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/charmander.png'
    ],
    type: 'Fire',
    abilities: ['Blaze', 'Solar Power'],
    stats: { hp: 39, att: 52, def: 43, sAtt: 60, sDef: 50, spd: 65 },
    evolution: [
      { name: 'Charmander', image: 'https://img.pokemondb.net/artwork/charmander.jpg', level: 1 },
      { name: 'Charmeleon', image: 'https://img.pokemondb.net/artwork/charmeleon.jpg', level: 16 },
      { name: 'Charizard', image: 'https://img.pokemondb.net/artwork/charizard.jpg', level: 36 }
    ]
  },
  {
    id: 5,
    name: 'Charmeleon',
    images: [
      'https://img.pokemondb.net/artwork/charmeleon.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/charmeleon.png'
    ],
    type: 'Fire',
    abilities: ['Blaze', 'Solar Power'],
    stats: { hp: 58, att: 64, def: 58, sAtt: 80, sDef: 65, spd: 80 },
    evolution: [
      { name: 'Charmander', image: 'https://img.pokemondb.net/artwork/charmander.jpg', level: 1 },
      { name: 'Charmeleon', image: 'https://img.pokemondb.net/artwork/charmeleon.jpg', level: 16 },
      { name: 'Charizard', image: 'https://img.pokemondb.net/artwork/charizard.jpg', level: 36 }
    ]
  },
  {
    id: 6,
    name: 'Charizard',
    images: [
      'https://img.pokemondb.net/artwork/charizard.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/charizard.png'
    ],
    type: 'Fire/Flying',
    abilities: ['Blaze', 'Solar Power'],
    stats: { hp: 78, att: 84, def: 78, sAtt: 109, sDef: 85, spd: 100 },
    evolution: [
      { name: 'Charmander', image: 'https://img.pokemondb.net/artwork/charmander.jpg', level: 1 },
      { name: 'Charmeleon', image: 'https://img.pokemondb.net/artwork/charmeleon.jpg', level: 16 },
      { name: 'Charizard', image: 'https://img.pokemondb.net/artwork/charizard.jpg', level: 36 }
    ]
  },
  {
    id: 1,
    name: 'Bulbasaur',
    images: [
      'https://img.pokemondb.net/artwork/bulbasaur.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/bulbasaur.png'
    ],
    type: 'Grass/Poison',
    abilities: ['Overgrow', 'Chlorophyll'],
    stats: { hp: 45, att: 49, def: 49, sAtt: 65, sDef: 65, spd: 45 },
    evolution: [
      { name: 'Bulbasaur', image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg', level: 1 },
      { name: 'Ivysaur', image: 'https://img.pokemondb.net/artwork/ivysaur.jpg', level: 16 },
      { name: 'Venusaur', image: 'https://img.pokemondb.net/artwork/venusaur.jpg', level: 32 }
    ]
  },
  {
    id: 2,
    name: 'Ivysaur',
    images: [
      'https://img.pokemondb.net/artwork/ivysaur.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/ivysaur.png'
    ],
    type: 'Grass/Poison',
    abilities: ['Overgrow', 'Chlorophyll'],
    stats: { hp: 60, att: 62, def: 63, sAtt: 80, sDef: 80, spd: 60 },
    evolution: [
      { name: 'Bulbasaur', image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg', level: 1 },
      { name: 'Ivysaur', image: 'https://img.pokemondb.net/artwork/ivysaur.jpg', level: 16 },
      { name: 'Venusaur', image: 'https://img.pokemondb.net/artwork/venusaur.jpg', level: 32 }
    ]
  },
  {
    id: 3,
    name: 'Venusaur',
    images: [
      'https://img.pokemondb.net/artwork/venusaur.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/venusaur.png'
    ],
    type: 'Grass/Poison',
    abilities: ['Overgrow', 'Chlorophyll'],
    stats: { hp: 80, att: 82, def: 83, sAtt: 100, sDef: 100, spd: 80 },
    evolution: [
      { name: 'Bulbasaur', image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg', level: 1 },
      { name: 'Ivysaur', image: 'https://img.pokemondb.net/artwork/ivysaur.jpg', level: 16 },
      { name: 'Venusaur', image: 'https://img.pokemondb.net/artwork/venusaur.jpg', level: 32 }
    ]
  },
  {
    id: 7,
    name: 'Squirtle',
    images: [
      'https://img.pokemondb.net/artwork/squirtle.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/squirtle.png'
    ],
    type: 'Water',
    abilities: ['Torrent', 'Rain Dish'],
    stats: { hp: 44, att: 48, def: 65, sAtt: 50, sDef: 64, spd: 43 },
    evolution: [
      { name: 'Squirtle', image: 'https://img.pokemondb.net/artwork/squirtle.jpg', level: 1 },
      { name: 'Wartortle', image: 'https://img.pokemondb.net/artwork/wartortle.jpg', level: 16 },
      { name: 'Blastoise', image: 'https://img.pokemondb.net/artwork/blastoise.jpg', level: 36 }
    ]
  },
  {
    id: 8,
    name: 'Wartortle',
    images: [
      'https://img.pokemondb.net/artwork/wartortle.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/wartortle.png'
    ],
    type: 'Water',
    abilities: ['Torrent', 'Rain Dish'],
    stats: { hp: 59, att: 63, def: 80, sAtt: 65, sDef: 80, spd: 58 },
    evolution: [
      { name: 'Squirtle', image: 'https://img.pokemondb.net/artwork/squirtle.jpg', level: 1 },
      { name: 'Wartortle', image: 'https://img.pokemondb.net/artwork/wartortle.jpg', level: 16 },
      { name: 'Blastoise', image: 'https://img.pokemondb.net/artwork/blastoise.jpg', level: 36 }
    ]
  },
  {
    id: 9,
    name: 'Blastoise',
    images: [
      'https://img.pokemondb.net/artwork/blastoise.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/blastoise.png'
    ],
    type: 'Water',
    abilities: ['Torrent', 'Rain Dish'],
    stats: { hp: 79, att: 83, def: 100, sAtt: 85, sDef: 105, spd: 78 },
    evolution: [
      { name: 'Squirtle', image: 'https://img.pokemondb.net/artwork/squirtle.jpg', level: 1 },
      { name: 'Wartortle', image: 'https://img.pokemondb.net/artwork/wartortle.jpg', level: 16 },
      { name: 'Blastoise', image: 'https://img.pokemondb.net/artwork/blastoise.jpg', level: 36 }
    ]
  },
  {
    id: 10,
    name: 'Caterpie',
    images: [
      'https://img.pokemondb.net/artwork/caterpie.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/caterpie.png'
    ],
    type: 'Bug',
    abilities: ['Shield Dust', 'Run Away'],
    stats: { hp: 45, att: 30, def: 35, sAtt: 20, sDef: 20, spd: 45 },
    evolution: [
      { name: 'Caterpie', image: 'https://img.pokemondb.net/artwork/caterpie.jpg', level: 1 },
      { name: 'Metapod', image: 'https://img.pokemondb.net/artwork/metapod.jpg', level: 7 },
      { name: 'Butterfree', image: 'https://img.pokemondb.net/artwork/butterfree.jpg', level: 10 }
    ]
  },
  {
    id: 11,
    name: 'Metapod',
    images: [
      'https://img.pokemondb.net/artwork/metapod.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/metapod.png'
    ],
    type: 'Bug',
    abilities: ['Shed Skin'],
    stats: { hp: 50, att: 20, def: 55, sAtt: 25, sDef: 25, spd: 30 },
    evolution: [
      { name: 'Caterpie', image: 'https://img.pokemondb.net/artwork/caterpie.jpg', level: 1 },
      { name: 'Metapod', image: 'https://img.pokemondb.net/artwork/metapod.jpg', level: 7 },
      { name: 'Butterfree', image: 'https://img.pokemondb.net/artwork/butterfree.jpg', level: 10 }
    ]
  },
  {
    id: 12,
    name: 'Butterfree',
    images: [
      'https://img.pokemondb.net/artwork/butterfree.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/butterfree.png'
    ],
    type: 'Bug/Flying',
    abilities: ['Compound Eyes', 'Tinted Lens'],
    stats: { hp: 60, att: 45, def: 50, sAtt: 90, sDef: 80, spd: 70 },
    evolution: [
      { name: 'Caterpie', image: 'https://img.pokemondb.net/artwork/caterpie.jpg', level: 1 },
      { name: 'Metapod', image: 'https://img.pokemondb.net/artwork/metapod.jpg', level: 7 },
      { name: 'Butterfree', image: 'https://img.pokemondb.net/artwork/butterfree.jpg', level: 10 }
    ]
  },
  {
    id: 13,
    name: 'Weedle',
    images: [
      'https://img.pokemondb.net/artwork/weedle.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/weedle.png'
    ],
    type: 'Bug/Poison',
    abilities: ['Shield Dust', 'Run Away'],
    stats: { hp: 40, att: 35, def: 30, sAtt: 20, sDef: 20, spd: 50 },
    evolution: [
      { name: 'Weedle', image: 'https://img.pokemondb.net/artwork/weedle.jpg', level: 1 },
      { name: 'Kakuna', image: 'https://img.pokemondb.net/artwork/kakuna.jpg', level: 7 },
      { name: 'Beedrill', image: 'https://img.pokemondb.net/artwork/beedrill.jpg', level: 10 }
    ]
  },
  {
    id: 14,
    name: 'Kakuna',
    images: [
      'https://img.pokemondb.net/artwork/kakuna.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/kakuna.png'
    ],
    type: 'Bug/Poison',
    abilities: ['Shed Skin'],
    stats: { hp: 45, att: 25, def: 50, sAtt: 25, sDef: 25, spd: 35 },
    evolution: [
      { name: 'Weedle', image: 'https://img.pokemondb.net/artwork/weedle.jpg', level: 1 },
      { name: 'Kakuna', image: 'https://img.pokemondb.net/artwork/kakuna.jpg', level: 7 },
      { name: 'Beedrill', image: 'https://img.pokemondb.net/artwork/beedrill.jpg', level: 10 }
    ]
  },
  {
    id: 15,
    name: 'Beedrill',
    images: [
      'https://img.pokemondb.net/artwork/beedrill.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/beedrill.png'
    ],
    type: 'Bug/Poison',
    abilities: ['Swarm', 'Sniper'],
    stats: { hp: 65, att: 90, def: 40, sAtt: 45, sDef: 80, spd: 75 },
    evolution: [
      { name: 'Weedle', image: 'https://img.pokemondb.net/artwork/weedle.jpg', level: 1 },
      { name: 'Kakuna', image: 'https://img.pokemondb.net/artwork/kakuna.jpg', level: 7 },
      { name: 'Beedrill', image: 'https://img.pokemondb.net/artwork/beedrill.jpg', level: 10 }
    ]
  },
  {
    id: 16,
    name: 'Pidgey',
    images: [
      'https://img.pokemondb.net/artwork/pidgey.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/pidgey.png'
    ],
    type: 'Normal/Flying',
    abilities: ['Keen Eye', 'Tangled Feet', 'Big Pecks'],
    stats: { hp: 40, att: 45, def: 40, sAtt: 35, sDef: 35, spd: 56 },
    evolution: [
      { name: 'Pidgey', image: 'https://img.pokemondb.net/artwork/pidgey.jpg', level: 1 },
      { name: 'Pidgeotto', image: 'https://img.pokemondb.net/artwork/pidgeotto.jpg', level: 18 },
      { name: 'Pidgeot', image: 'https://img.pokemondb.net/artwork/pidgeot.jpg', level: 36 }
    ]
  },
  {
    id: 17,
    name: 'Pidgeotto',
    images: [
      'https://img.pokemondb.net/artwork/pidgeotto.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/pidgeotto.png'
    ],
    type: 'Normal/Flying',
    abilities: ['Keen Eye', 'Tangled Feet', 'Big Pecks'],
    stats: { hp: 63, att: 60, def: 55, sAtt: 50, sDef: 50, spd: 71 },
    evolution: [
      { name: 'Pidgey', image: 'https://img.pokemondb.net/artwork/pidgey.jpg', level: 1 },
      { name: 'Pidgeotto', image: 'https://img.pokemondb.net/artwork/pidgeotto.jpg', level: 18 },
      { name: 'Pidgeot', image: 'https://img.pokemondb.net/artwork/pidgeot.jpg', level: 36 }
    ]
  },
  {
    id: 18,
    name: 'Pidgeot',
    images: [
      'https://img.pokemondb.net/artwork/pidgeot.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/pidgeot.png'
    ],
    type: 'Normal/Flying',
    abilities: ['Keen Eye', 'Tangled Feet', 'Big Pecks'],
    stats: { hp: 83, att: 80, def: 75, sAtt: 70, sDef: 70, spd: 101 },
    evolution: [
      { name: 'Pidgey', image: 'https://img.pokemondb.net/artwork/pidgey.jpg', level: 1 },
      { name: 'Pidgeotto', image: 'https://img.pokemondb.net/artwork/pidgeotto.jpg', level: 18 },
      { name: 'Pidgeot', image: 'https://img.pokemondb.net/artwork/pidgeot.jpg', level: 36 }
    ]
  },
  {
    id: 19,
    name: 'Rattata',
    images: [
      'https://img.pokemondb.net/artwork/rattata.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/rattata.png'
    ],
    type: 'Normal',
    abilities: ['Run Away', 'Guts', 'Hustle'],
    stats: { hp: 30, att: 56, def: 35, sAtt: 25, sDef: 35, spd: 72 },
    evolution: [
      { name: 'Rattata', image: 'https://img.pokemondb.net/artwork/rattata.jpg', level: 1 },
      { name: 'Raticate', image: 'https://img.pokemondb.net/artwork/raticate.jpg', level: 20 }
    ]
  },
  {
    id: 20,
    name: 'Raticate',
    images: [
      'https://img.pokemondb.net/artwork/raticate.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/raticate.png'
    ],
    type: 'Normal',
    abilities: ['Run Away', 'Guts', 'Hustle'],
    stats: { hp: 55, att: 81, def: 60, sAtt: 50, sDef: 70, spd: 97 },
    evolution: [
      { name: 'Rattata', image: 'https://img.pokemondb.net/artwork/rattata.jpg', level: 1 },
      { name: 'Raticate', image: 'https://img.pokemondb.net/artwork/raticate.jpg', level: 20 }
    ]
  },
  {
    id: 21,
    name: 'Spearow',
    images: [
      'https://img.pokemondb.net/artwork/spearow.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/spearow.png'
    ],
    type: 'Normal/Flying',
    abilities: ['Keen Eye', 'Sniper'],
    stats: { hp: 40, att: 60, def: 30, sAtt: 31, sDef: 31, spd: 70 },
    evolution: [
      { name: 'Spearow', image: 'https://img.pokemondb.net/artwork/spearow.jpg', level: 1 },
      { name: 'Fearow', image: 'https://img.pokemondb.net/artwork/fearow.jpg', level: 20 }
    ]
  },
  {
    id: 22,
    name: 'Fearow',
    images: [
      'https://img.pokemondb.net/artwork/fearow.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/fearow.png'
    ],
    type: 'Normal/Flying',
    abilities: ['Keen Eye', 'Sniper'],
    stats: { hp: 65, att: 90, def: 65, sAtt: 61, sDef: 61, spd: 100 },
    evolution: [
      { name: 'Spearow', image: 'https://img.pokemondb.net/artwork/spearow.jpg', level: 1 },
      { name: 'Fearow', image: 'https://img.pokemondb.net/artwork/fearow.jpg', level: 20 }
    ]
  },
  {
    id: 23,
    name: 'Ekans',
    images: [
      'https://img.pokemondb.net/artwork/ekans.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/ekans.png'
    ],
    type: 'Poison',
    abilities: ['Intimidate', 'Shed Skin', 'Unnerve'],
    stats: { hp: 35, att: 60, def: 44, sAtt: 40, sDef: 54, spd: 55 },
    evolution: [
      { name: 'Ekans', image: 'https://img.pokemondb.net/artwork/ekans.jpg', level: 1 },
      { name: 'Arbok', image: 'https://img.pokemondb.net/artwork/arbok.jpg', level: 22 }
    ]
  },
  {
    id: 24,
    name: 'Arbok',
    images: [
      'https://img.pokemondb.net/artwork/arbok.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/arbok.png'
    ],
    type: 'Poison',
    abilities: ['Intimidate', 'Shed Skin', 'Unnerve'],
    stats: { hp: 60, att: 95, def: 69, sAtt: 65, sDef: 79, spd: 80 },
    evolution: [
      { name: 'Ekans', image: 'https://img.pokemondb.net/artwork/ekans.jpg', level: 1 },
      { name: 'Arbok', image: 'https://img.pokemondb.net/artwork/arbok.jpg', level: 22 }
    ]
  },
  {
    id: 25,
    name: 'Pikachu',
    images: [
      'https://img.pokemondb.net/artwork/pikachu.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/pikachu.png'
    ],
    type: 'Electric',
    abilities: ['Static', 'Lightning Rod'],
    stats: { hp: 35, att: 55, def: 40, sAtt: 50, sDef: 50, spd: 90 },
    evolution: [
      { name: 'Pichu', image: 'https://img.pokemondb.net/artwork/pichu.jpg', level: 1 },
      { name: 'Pikachu', image: 'https://img.pokemondb.net/artwork/pikachu.jpg', level: 'Friendship' },
      { name: 'Raichu', image: 'https://img.pokemondb.net/artwork/raichu.jpg', level: 'Thunder Stone' }
    ]
  },
  {
    id: 26,
    name: 'Raichu',
    images: [
      'https://img.pokemondb.net/artwork/raichu.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/raichu.png'
    ],
    type: 'Electric',
    abilities: ['Static', 'Lightning Rod'],
    stats: { hp: 60, att: 90, def: 55, sAtt: 90, sDef: 80, spd: 110 },
    evolution: [
      { name: 'Pichu', image: 'https://img.pokemondb.net/artwork/pichu.jpg', level: 1 },
      { name: 'Pikachu', image: 'https://img.pokemondb.net/artwork/pikachu.jpg', level: 'Friendship' },
      { name: 'Raichu', image: 'https://img.pokemondb.net/artwork/raichu.jpg', level: 'Thunder Stone' }
    ]
  },
  {
    id: 27,
    name: 'Sandshrew',
    images: [
      'https://img.pokemondb.net/artwork/sandshrew.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/sandshrew.png'
    ],
    type: 'Ground',
    abilities: ['Sand Veil', 'Sand Rush'],
    stats: { hp: 50, att: 75, def: 85, sAtt: 20, sDef: 30, spd: 40 },
    evolution: [
      { name: 'Sandshrew', image: 'https://img.pokemondb.net/artwork/sandshrew.jpg', level: 1 },
      { name: 'Sandslash', image: 'https://img.pokemondb.net/artwork/sandslash.jpg', level: 22 }
    ]
  },
  {
    id: 28,
    name: 'Sandslash',
    images: [
      'https://img.pokemondb.net/artwork/sandslash.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/sandslash.png'
    ],
    type: 'Ground',
    abilities: ['Sand Veil', 'Sand Rush'],
    stats: { hp: 75, att: 100, def: 110, sAtt: 45, sDef: 55, spd: 65 },
    evolution: [
      { name: 'Sandshrew', image: 'https://img.pokemondb.net/artwork/sandshrew.jpg', level: 1 },
      { name: 'Sandslash', image: 'https://img.pokemondb.net/artwork/sandslash.jpg', level: 22 }
    ]
  },
  {
    id: 29,
    name: 'Nidoran♀',
    images: [
      'https://img.pokemondb.net/artwork/nidoran-f.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/nidoran-f.png'
    ],
    type: 'Poison',
    abilities: ['Poison Point', 'Rivalry', 'Hustle'],
    stats: { hp: 55, att: 47, def: 52, sAtt: 40, sDef: 40, spd: 41 },
    evolution: [
      { name: 'Nidoran♀', image: 'https://img.pokemondb.net/artwork/nidoran-f.jpg', level: 1 },
      { name: 'Nidorina', image: 'https://img.pokemondb.net/artwork/nidorina.jpg', level: 16 },
      { name: 'Nidoqueen', image: 'https://img.pokemondb.net/artwork/nidoqueen.jpg', level: 36 }
    ]
  },
  {
    id: 30,
    name: 'Nidorina',
    images: [
      'https://img.pokemondb.net/artwork/nidorina.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/nidorina.png'
    ],
    type: 'Poison',
    abilities: ['Poison Point', 'Rivalry', 'Hustle'],
    stats: { hp: 70, att: 62, def: 67, sAtt: 55, sDef: 55, spd: 56 },
    evolution: [
      { name: 'Nidoran♀', image: 'https://img.pokemondb.net/artwork/nidoran-f.jpg', level: 1 },
      { name: 'Nidorina', image: 'https://img.pokemondb.net/artwork/nidorina.jpg', level: 16 },
      { name: 'Nidoqueen', image: 'https://img.pokemondb.net/artwork/nidoqueen.jpg', level: 36 }
    ]
  },
  {
    id: 31,
    name: 'Nidoqueen',
    images: [
      'https://img.pokemondb.net/artwork/nidoqueen.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/nidoqueen.png'
    ],
    type: 'Poison/Ground',
    abilities: ['Poison Point', 'Rivalry', 'Sheer Force'],
    stats: { hp: 90, att: 92, def: 87, sAtt: 75, sDef: 85, spd: 76 },
    evolution: [
      { name: 'Nidoran♀', image: 'https://img.pokemondb.net/artwork/nidoran-f.jpg', level: 1 },
      { name: 'Nidorina', image: 'https://img.pokemondb.net/artwork/nidorina.jpg', level: 16 },
      { name: 'Nidoqueen', image: 'https://img.pokemondb.net/artwork/nidoqueen.jpg', level: 36 }
    ]
  },
  {
    id: 32,
    name: 'Nidoran♂',
    images: [
      'https://img.pokemondb.net/artwork/nidoran-m.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/nidoran-m.png'
    ],
    type: 'Poison',
    abilities: ['Poison Point', 'Rivalry', 'Hustle'],
    stats: { hp: 46, att: 57, def: 40, sAtt: 40, sDef: 40, spd: 50 },
    evolution: [
      { name: 'Nidoran♂', image: 'https://img.pokemondb.net/artwork/nidoran-m.jpg', level: 1 },
      { name: 'Nidorino', image: 'https://img.pokemondb.net/artwork/nidorino.jpg', level: 16 },
      { name: 'Nidoking', image: 'https://img.pokemondb.net/artwork/nidoking.jpg', level: 36 }
    ]
  },
  {
    id: 33,
    name: 'Nidorino',
    images: [
      'https://img.pokemondb.net/artwork/nidorino.jpg',
      'https://img.pokemondb.net/sprites/black-white/shiny/nidorino.png'
    ],
    type: 'Poison',
    abilities: ['Poison Point', 'Rivalry', 'Hustle'],
    stats: { hp: 61, att: 72, def: 57, sAtt: 55, sDef: 55, spd: 65 },
    evolution: [
      { name: 'Nidoran♂', image: 'https://img.pokemondb.net/artwork/nidoran-m.jpg', level: 1 },
      { name: 'Nidorino', image: 'https://img.pokemondb.net/artwork/nidorino.jpg', level: 16 },
      { name: 'Nidoking', image: 'https://img.pokemondb.net/artwork/nidoking.jpg', level: 36 }
    ]
  }
])

const search = ref('')
const typeFilter = ref('')

const types = computed(() => {
  const allTypes = pokemons.value.map(p => p.type.split('/')).flat()
  return [...new Set(allTypes)]
})

const filteredPokemons = computed(() =>
  pokemons.value.filter(p =>
    (p.name.toLowerCase().includes(search.value.toLowerCase()) ||
     p.type.toLowerCase().includes(search.value.toLowerCase()) ||
     String(p.id).includes(search.value)) &&
    (typeFilter.value === '' || p.type.includes(typeFilter.value))
  )
)
</script>