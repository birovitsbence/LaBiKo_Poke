import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonCard from '../PokemonCard.vue'

const POKEMON = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  images: ['https://img/p1.png', 'https://img/p2.png'],
  abilities: ['Static', 'Lightning Rod'],
  stats: { hp: 35, att: 55, def: 40, sAtt: 50, sDef: 50, spd: 90 },
  evolution: [
    { name: 'Pichu', image: 'https://img/pichu.png', level: 1 },
    { name: 'Pikachu', image: 'https://img/pikachu.png', level: 'Friendship' },
    { name: 'Raichu', image: 'https://img/raichu.png', level: 'Thunder Stone' }
  ]
}

describe('PokemonCard.vue', () => {
  it('név, pokédex-szám (padStart) és típus megjelenik', () => {
    const w = mount(PokemonCard, { props: { pokemon: POKEMON, isFavorite: false } })
    expect(w.text()).toContain('Pikachu')
    expect(w.text()).toContain('#0025')
    expect(w.text()).toContain('Típus:')
    expect(w.text()).toContain('Electric')
  })

  it('képek alt szövege rendben', () => {
    const w = mount(PokemonCard, { props: { pokemon: POKEMON } })
    const imgs = w.findAll('img')
    expect(imgs.length).toBeGreaterThanOrEqual(POKEMON.images.length)
    imgs.slice(0, POKEMON.images.length).forEach(img => {
      expect(img.attributes('alt')).toContain(`${POKEMON.name} image`)
    })
  })

  it('ability-k és base statok látszanak', () => {
    const w = mount(PokemonCard, { props: { pokemon: POKEMON } })
    expect(w.text()).toContain('Static, Lightning Rod')
    Object.values(POKEMON.stats).forEach(v => expect(w.text()).toContain(String(v)))
  })

  it('evolúciós szintek (az első elemnél nincs „Lv.”)', () => {
    const w = mount(PokemonCard, { props: { pokemon: POKEMON } })
    expect(w.text()).toContain('Lv. Friendship')
    expect(w.text()).toContain('Lv. Thunder Stone')
  })
})