import { describe, expect, it } from 'vitest'

import { buildCardRenderKey, getRarityColor } from './CardList'

describe('CardList helpers', () => {
  it('returns rarity gradient classes', () => {
    expect(getRarityColor(1)).toBe('rarity-common')
    expect(getRarityColor(3)).toBe('rarity-rare')
    expect(getRarityColor(4)).toBe('rarity-epic')
    expect(getRarityColor(5)).toBe('rarity-legendary')
    expect(getRarityColor(2)).toBe('rarity-none')
  })

  it('builds stable keys even when card id is missing', () => {
    const keyFromId = buildCardRenderKey(
      {
        id: 42,
        collectible: 1,
        classId: 1,
        cardTypeId: 1,
        cardSetId: 1,
        rarityId: 1,
        artistName: 'Artist',
        health: 1,
        attack: 1,
        manaCost: 1,
        parentId: 1,
      },
      0,
    )
    const keyFromImage = buildCardRenderKey(
      {
        collectible: 1,
        classId: 1,
        cardTypeId: 1,
        cardSetId: 1,
        rarityId: 1,
        artistName: 'Artist',
        health: 1,
        attack: 1,
        manaCost: 1,
        parentId: 1,
        image: 'https://cdn/image.png',
      },
      1,
    )
    const keyFallback = buildCardRenderKey(
      {
        collectible: 1,
        classId: 1,
        cardTypeId: 1,
        cardSetId: 1,
        rarityId: 1,
        artistName: 'Artist',
        health: 1,
        attack: 1,
        manaCost: 1,
        parentId: 1,
        name: 'No Id',
      },
      2,
    )

    expect(keyFromId).toBe('card-id-42')
    expect(keyFromImage).toBe('card-image-https://cdn/image.png')
    expect(keyFallback).toBe('card-fallback-2-No Id')
  })
})
