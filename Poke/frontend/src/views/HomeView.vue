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
]);

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