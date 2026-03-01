import { describe, expect, it } from 'vitest'

import { cardsFilterSignature, normalizeCardsFilter } from './cards-filter'

describe('cards filter helpers', () => {
  it('normalizes text and arrays', () => {
    const filter = normalizeCardsFilter({
      name: '  mage  ',
      type: [7, 4, 4],
      keywords: [3, 1, 1],
      page: 1,
    })

    expect(filter).toEqual({
      name: 'mage',
      manaCost: undefined,
      health: undefined,
      attack: undefined,
      class: undefined,
      rarity: undefined,
      type: [4, 7],
      keywords: [1, 3],
      set: undefined,
      page: 1,
      limit: undefined,
    })
  })

  it('applies default types when filter has none', () => {
    const filter = normalizeCardsFilter({}, { defaultTypes: [7, 4, 4] })
    expect(filter.type).toEqual([4, 7])
  })

  it('produces stable signature across array order', () => {
    const firstSignature = cardsFilterSignature({
      keywords: [5, 1],
      type: [7, 4],
    })
    const secondSignature = cardsFilterSignature({
      type: [4, 7],
      keywords: [1, 5],
    })

    expect(firstSignature).toEqual(secondSignature)
  })
})
