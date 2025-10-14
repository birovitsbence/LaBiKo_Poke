import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../views/HomeView.vue'
import PokemonCard from '../../components/PokemonCard.vue'

const FAVORITES = '__FAVORITES__'

function setFav(ids) {
  window.localStorage.setItem('favorites', JSON.stringify(ids))
}

describe('HomeView.vue', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('címsor és kártyák megjelennek', () => {
    const w = mount(HomeView)
    expect(w.text()).toContain('Pokédex')
    expect(w.findAllComponents(PokemonCard).length).toBeGreaterThan(0)
  })

  it('keresés név/típus/ID alapján', async () => {
    const w = mount(HomeView)
    const input = w.get('input[placeholder^="Keresés"]')

    await input.setValue('pika')      // név
    expect(w.text()).toContain('Pikachu')

    await input.setValue('water')     // típus
    expect(w.text().toLowerCase()).toContain('water')
    expect(w.findAllComponents(PokemonCard).length).toBeGreaterThan(0)

    await input.setValue('25')        // ID
    expect(w.text()).toContain('Pikachu')
  })

  it('nincs találat üzenet', async () => {
    const w = mount(HomeView)
    await w.get('input[placeholder^="Keresés"]').setValue('nemletezik123')
    expect(w.text()).toContain('❌ Nem található ilyen Pokémon')
    expect(w.findAllComponents(PokemonCard).length).toBe(0)
  })

  it('Kedvencek szűrő csak kedvenceket adja', async () => {
    setFav([25]) // Pikachu
    const w = mount(HomeView)
    const select = w.get('select')

    await select.setValue(FAVORITES)
    const cards = w.findAllComponents(PokemonCard)
    expect(cards.length).toBe(1)
    expect(cards[0].props('pokemon').id).toBe(25)
    expect(cards[0].props('isFavorite')).toBe(true)
  })

  it('kedvencre váltás elmentődik localStorage-ba', async () => {
    setFav([])
    const w = mount(HomeView)
    const select = w.get('select')

    // jelöld kedvenccé Pikachut
    const pika = w.findAllComponents(PokemonCard).find(c => c.props('pokemon').name === 'Pikachu')
    await pika.vm.$emit('toggle-favorite', pika.props('pokemon').id)

    const saved = JSON.parse(window.localStorage.getItem('favorites') || '[]')
    expect(saved).toContain(25)

    await select.setValue(FAVORITES)
    const favs = w.findAllComponents(PokemonCard)
    expect(favs.length).toBe(1)
    expect(favs[0].props('pokemon').id).toBe(25)
  })

  it('típus opciók tartalmaznak néhány fő típust', () => {
    const w = mount(HomeView)
    const options = w.findAll('select option').map(o => o.text())
    expect(options).toEqual(expect.arrayContaining(['Összes típus', 'Kedvencek', 'Fire', 'Water', 'Grass', 'Poison', 'Electric']))
  })
})
