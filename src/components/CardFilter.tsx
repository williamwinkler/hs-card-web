import { useQuery } from '@tanstack/react-query'
import { Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import {
  type CardsListParams,
  fetchClasses,
  fetchKeywords,
  fetchRarities,
  fetchSets,
  fetchTypes,
} from '~/api'
import { normalizeCardsFilter } from '~/lib/cards-filter'
import { toSelectOptions } from '~/lib/select-options'
import { useSearch } from '~/routes/__root'

interface CardFilterProps {
  updateFilter: (filter: CardsListParams) => void
}

const REFERENCE_DATA_STALE_TIME_MS = 30 * 60_000
const REFERENCE_DATA_GC_TIME_MS = 12 * 60 * 60_000

function createManaOptions() {
  const options: { value: number; label: string }[] = []
  for (let value = 0; value <= 6; value += 1) {
    options.push({ value, label: String(value) })
  }
  options.push({ value: 99, label: '7+' })
  return options
}

export default function CardFilter({ updateFilter }: CardFilterProps) {
  const { searchTerm } = useSearch()
  const [keywords, setKeywords] = useState<number[]>([])
  const [types, setTypes] = useState<number[]>([])
  const [rarity, setRarity] = useState<number | undefined>()
  const [cardSet, setCardSet] = useState<number | undefined>()
  const [classId, setClassId] = useState<number | undefined>()
  const [attack, setAttack] = useState<number | undefined>()
  const [health, setHealth] = useState<number | undefined>()
  const [manaCost, setManaCost] = useState<number | undefined>()

  const { data: typesData } = useQuery({
    queryKey: ['types'],
    queryFn: ({ signal }) => fetchTypes(signal),
    staleTime: REFERENCE_DATA_STALE_TIME_MS,
    gcTime: REFERENCE_DATA_GC_TIME_MS,
  })

  const { data: keywordsData } = useQuery({
    queryKey: ['keywords'],
    queryFn: ({ signal }) => fetchKeywords(signal),
    staleTime: REFERENCE_DATA_STALE_TIME_MS,
    gcTime: REFERENCE_DATA_GC_TIME_MS,
  })

  const { data: raritiesData } = useQuery({
    queryKey: ['rarities'],
    queryFn: ({ signal }) => fetchRarities(signal),
    staleTime: REFERENCE_DATA_STALE_TIME_MS,
    gcTime: REFERENCE_DATA_GC_TIME_MS,
  })

  const { data: setsData } = useQuery({
    queryKey: ['sets'],
    queryFn: ({ signal }) => fetchSets(signal),
    staleTime: REFERENCE_DATA_STALE_TIME_MS,
    gcTime: REFERENCE_DATA_GC_TIME_MS,
  })

  const { data: classesData } = useQuery({
    queryKey: ['classes'],
    queryFn: ({ signal }) => fetchClasses(signal),
    staleTime: REFERENCE_DATA_STALE_TIME_MS,
    gcTime: REFERENCE_DATA_GC_TIME_MS,
  })

  const typeOptions = useMemo(
    () =>
      toSelectOptions(
        typesData?.filter(
          (cardType) => cardType.name !== 'HeroPower' && cardType.name !== 'Reward',
        ),
      ),
    [typesData],
  )
  const keywordOptions = useMemo(() => toSelectOptions(keywordsData), [keywordsData])
  const rarityOptions = useMemo(() => toSelectOptions(raritiesData), [raritiesData])
  const setOptions = useMemo(() => toSelectOptions(setsData), [setsData])
  const classOptions = useMemo(() => toSelectOptions(classesData), [classesData])
  const manaOptions = useMemo(() => createManaOptions(), [])

  const normalizedFilter = useMemo(
    () =>
      normalizeCardsFilter({
        name: searchTerm,
        keywords,
        type: types,
        rarity,
        set: cardSet,
        class: classId,
        attack,
        health,
        manaCost,
      }),
    [attack, cardSet, classId, health, keywords, manaCost, rarity, searchTerm, types],
  )

  useEffect(() => {
    updateFilter(normalizedFilter)
  }, [normalizedFilter, updateFilter])

  return (
    <div className="card-filter">
      <Select
        style={{ minWidth: 140 }}
        options={typeOptions}
        value={types.length > 0 ? types : undefined}
        onChange={(selectedTypes: number[]) => setTypes(selectedTypes)}
        onClear={() => setTypes([])}
        placeholder="Type"
        allowClear
        mode="multiple"
        maxTagCount={0}
        maxTagPlaceholder={(omitted) => `${omitted.length} types`}
        size="middle"
      />
      <Select
        style={{ minWidth: 130 }}
        allowClear
        options={classOptions}
        value={classId}
        onChange={(selectedClassId) => setClassId(selectedClassId)}
        onClear={() => setClassId(undefined)}
        placeholder="Class"
        size="middle"
      />
      <Select
        allowClear
        style={{ minWidth: 130 }}
        options={rarityOptions}
        value={rarity}
        onChange={(selectedRarity) => setRarity(selectedRarity)}
        onClear={() => setRarity(undefined)}
        placeholder="Rarity"
        size="middle"
      />
      <Select
        style={{ minWidth: 280 }}
        allowClear
        options={setOptions}
        value={cardSet}
        onChange={(selectedSet) => setCardSet(selectedSet)}
        onClear={() => setCardSet(undefined)}
        placeholder="Set"
        size="middle"
      />
      <Select
        style={{ minWidth: 140 }}
        mode="multiple"
        allowClear
        options={keywordOptions}
        value={keywords}
        onChange={(selectedKeywords: number[]) => setKeywords(selectedKeywords)}
        onClear={() => setKeywords([])}
        placeholder="Keyword"
        maxTagCount={0}
        maxTagPlaceholder={(omitted) => `${omitted.length} keys`}
        size="middle"
      />
      <Select
        allowClear
        style={{ minWidth: 80 }}
        options={manaOptions}
        value={manaCost}
        onChange={(selectedManaCost) => setManaCost(selectedManaCost)}
        onClear={() => setManaCost(undefined)}
        placeholder="Mana"
        size="middle"
      />
      <Select
        allowClear
        style={{ minWidth: 80 }}
        options={manaOptions}
        value={attack}
        onChange={(selectedAttack) => setAttack(selectedAttack)}
        onClear={() => setAttack(undefined)}
        placeholder="Atk"
        size="middle"
      />
      <Select
        allowClear
        style={{ minWidth: 80 }}
        options={manaOptions}
        value={health}
        onChange={(selectedHealth) => setHealth(selectedHealth)}
        onClear={() => setHealth(undefined)}
        placeholder="HP"
        size="middle"
      />
    </div>
  )
}
