import { describe, expect, it } from 'vitest'

import {
  buildCardRenderKey,
  getCardSlots,
  getKeyboardNavigationPage,
  getRarityColor,
  getTotalPages,
} from './CardList'
import type { Card } from '~/api/types'

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

  it('computes total pages from card count when page count is absent', () => {
    expect(getTotalPages(0)).toBe(1)
    expect(getTotalPages(8)).toBe(1)
    expect(getTotalPages(9)).toBe(2)
    expect(getTotalPages(24, 5)).toBe(5)
  })

  it('returns the next or previous page for arrow key navigation', () => {
    expect(
      getKeyboardNavigationPage({
        currentPage: 1,
        totalPages: 3,
        key: 'ArrowRight',
        target: document.body,
      }),
    ).toBe(2)

    expect(
      getKeyboardNavigationPage({
        currentPage: 2,
        totalPages: 3,
        key: 'ArrowLeft',
        target: document.body,
      }),
    ).toBe(1)
  })

  it('ignores arrow navigation at bounds and in editable fields', () => {
    const input = document.createElement('input')

    expect(
      getKeyboardNavigationPage({
        currentPage: 3,
        totalPages: 3,
        key: 'ArrowRight',
        target: document.body,
      }),
    ).toBeNull()

    expect(
      getKeyboardNavigationPage({
        currentPage: 1,
        totalPages: 3,
        key: 'ArrowLeft',
        target: document.body,
      }),
    ).toBeNull()

    expect(
      getKeyboardNavigationPage({
        currentPage: 1,
        totalPages: 3,
        key: 'ArrowRight',
        target: input,
      }),
    ).toBeNull()

    expect(
      getKeyboardNavigationPage({
        currentPage: 2,
        totalPages: 3,
        key: 'ArrowRight',
        target: document.body,
        isPreviewOpen: true,
      }),
    ).toBeNull()
  })

  it('only shows loading skeleton slots during an empty fetch', () => {
    const cards: Card[] = [
      {
        id: 1,
        name: 'Test Card',
        rarityId: 1,
      },
    ]

    expect(getCardSlots([], true)).toHaveLength(8)
    expect(getCardSlots(cards, false)).toEqual(cards)
    expect(getCardSlots(cards, true)).toEqual(cards)
    expect(getCardSlots([], false)).toEqual([])
  })
})
