<template>
  <div class="pokemon-card bg-white rounded-lg shadow p-4 flex flex-col items-center relative">
    <button
      class="absolute top-2 right-2 text-2xl leading-none select-none"
      :aria-label="isFavorite ? 'Kedvencből kivesz' : 'Kedvencbe tesz'"
      @click="$emit('toggle-favorite', pokemon.id)"
      title="Kedvenc"
    >
      <span v-if="isFavorite">★</span>
      <span v-else>☆</span>
    </button>

    <div class="flex gap-2 mb-2">
      <img v-for="(img, i) in pokemon.images" :key="i" :src="img" :alt="pokemon.name + ' image'" class="w-16 h-16 object-contain rounded" />
    </div>
    <h2 class="text-xl font-bold mb-1">{{ pokemon.name }}</h2>
    <p class="mb-1"><span class="font-semibold">Pokédex:</span> #{{ pokemon.id.toString().padStart(4, '0') }}</p>
    <p class="mb-1"><span class="font-semibold">Típus:</span> <span class="bg-red-400 text-white px-2 py-1 rounded">{{ pokemon.type }}</span></p>
    <p class="mb-1"><span class="font-semibold">Képességek:</span> {{ pokemon.abilities.join(', ') }}</p>

    <div class="mb-2 w-full">
      <p class="font-semibold mb-1">Base Stats</p>
        <div class="grid grid-cols-6 text-center text-sm">
          <div><strong>HP</strong><br>{{ pokemon.stats.hp }}</div>
          <div><strong>Att</strong><br>{{ pokemon.stats.att }}</div>
          <div><strong>Def</strong><br>{{ pokemon.stats.def }}</div>
          <div><strong>S.Att</strong><br>{{ pokemon.stats.sAtt }}</div>
          <div><strong>S.Def</strong><br>{{ pokemon.stats.sDef }}</div>
          <div><strong>Spd</strong><br>{{ pokemon.stats.spd }}</div>
        </div>
      </div>

    <div class="w-full">
      <div class="font-semibold mb-1">Evolutionary Chain</div>
      <div class="flex gap-2 justify-center items-center">
        <div v-for="(evo, idx) in pokemon.evolution" :key="evo.name" class="flex flex-col items-center">
          <img :src="evo.image" :alt="evo.name" class="w-10 h-10 rounded" />
          <span class="text-xs">{{ evo.name }}</span>
          <span v-if="idx !== 0" class="text-xs">Lv. {{ evo.level }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  emits: ['toggle-favorite'],
  props: {
    pokemon: { type: Object, required: true },
    isFavorite: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.pokemon-card { min-width: 220px; }
</style>
