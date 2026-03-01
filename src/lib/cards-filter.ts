import type { CardsListParams } from '~/api/api-client'

interface NormalizeCardsFilterOptions {
  defaultTypes?: number[]
}

function normalizeNumberList(values: number[] | undefined): number[] | undefined {
  if (!values || values.length === 0) {
    return undefined
  }

  const normalizedValues = Array.from(
    new Set(values.filter((value) => Number.isInteger(value) && value >= 0)),
  ).sort((a, b) => a - b)

  return normalizedValues.length > 0 ? normalizedValues : undefined
}

function normalizeName(value: string | undefined): string | undefined {
  if (!value) {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function normalizeNumber(value: number | undefined): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

export function normalizeCardsFilter(
  filter: CardsListParams,
  options: NormalizeCardsFilterOptions = {},
): CardsListParams {
  const normalizedType =
    normalizeNumberList(filter.type) ?? normalizeNumberList(options.defaultTypes)

  return {
    name: normalizeName(filter.name),
    manaCost: normalizeNumber(filter.manaCost),
    health: normalizeNumber(filter.health),
    attack: normalizeNumber(filter.attack),
    class: normalizeNumber(filter.class),
    rarity: normalizeNumber(filter.rarity),
    type: normalizedType,
    keywords: normalizeNumberList(filter.keywords),
    set: normalizeNumber(filter.set),
    page: normalizeNumber(filter.page),
    limit: normalizeNumber(filter.limit),
  }
}

export function buildCardsQueryKey(
  filter: CardsListParams,
  page: number,
  limit: number,
): readonly [string, CardsListParams] {
  return [
    'cards',
    normalizeCardsFilter({
      ...filter,
      page,
      limit,
    }),
  ] as const
}

export function cardsFilterSignature(filter: CardsListParams): string {
  const normalizedFilter = normalizeCardsFilter(filter)
  return JSON.stringify(normalizedFilter)
}
