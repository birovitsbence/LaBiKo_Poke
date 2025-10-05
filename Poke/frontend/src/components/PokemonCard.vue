<template>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.pokemon-card {
  min-width: 220px;
}
</style>