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
    it('típus opciók tartalmaznak néhány fő típust', () => {
    const w = mount(HomeView)
    const options = w.findAll('select option').map(o => o.text())
    expect(options).toEqual(expect.arrayContaining(['Összes típus', 'Kedvencek', 'Fire', 'Water', 'Grass', 'Poison', 'Electric']))
  })
})
