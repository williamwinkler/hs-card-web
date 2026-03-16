import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Image } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'

import CardPagination from './CardPagination'

import { type CardsListParams, fetchCards } from '~/api'
import type { Card } from '~/api/types'
import {
  buildCardsQueryKey,
  cardsFilterSignature,
  normalizeCardsFilter,
} from '~/lib/cards-filter'

interface CardListProps {
  filter: CardsListParams
}

const DEFAULT_TYPES = [4, 5, 7]
const CARDS_PER_PAGE = 8

export function getTotalPages(cardCount: number, pageCount?: number): number {
  if (typeof pageCount === 'number' && pageCount > 0) {
    return pageCount
  }

  return Math.max(1, Math.ceil(cardCount / CARDS_PER_PAGE))
}

export function isEditableKeyboardTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const tagName = target.tagName.toLowerCase()
  return tagName === 'input' || tagName === 'textarea' || tagName === 'select'
}

interface KeyboardNavigationOptions {
  currentPage: number
  totalPages: number
  key: string
  target: EventTarget | null
  isPreviewOpen?: boolean
  defaultPrevented?: boolean
  metaKey?: boolean
  ctrlKey?: boolean
  altKey?: boolean
}

export function getKeyboardNavigationPage({
  currentPage,
  totalPages,
  key,
  target,
  isPreviewOpen = false,
  defaultPrevented = false,
  metaKey = false,
  ctrlKey = false,
  altKey = false,
}: KeyboardNavigationOptions): number | null {
  if (isPreviewOpen || defaultPrevented || metaKey || ctrlKey || altKey) {
    return null
  }

  if (isEditableKeyboardTarget(target)) {
    return null
  }

  if (key === 'ArrowRight' && currentPage < totalPages) {
    return currentPage + 1
  }

  if (key === 'ArrowLeft' && currentPage > 1) {
    return currentPage - 1
  }

  return null
}

export function getRarityColor(rarityId: Card['rarityId']): string {
  if (rarityId === 1) return 'rarity-common'
  if (rarityId === 3) return 'rarity-rare'
  if (rarityId === 4) return 'rarity-epic'
  if (rarityId === 5) return 'rarity-legendary'
  return 'rarity-none'
}

export function buildCardRenderKey(card: Card, index: number): string {
  if (typeof card.id === 'number') {
    return `card-id-${card.id}`
  }

  if (typeof card.image === 'string' && card.image.length > 0) {
    return `card-image-${card.image}`
  }

  return `card-fallback-${index}-${card.name ?? 'unknown'}`
}

export function getCardSlots(cards: Card[], isFetching: boolean): Array<Card | null> {
  if (cards.length === 0 && isFetching) {
    return Array.from({ length: CARDS_PER_PAGE }, () => null)
  }

  return cards
}

function CardSkeleton({ keySuffix }: { keySuffix: number }) {
  return (
    <div
      data-skeleton={keySuffix}
      className="card card-skeleton"
    >
      <div className="card-skeleton-icon-wrap">
        <svg
          className="card-skeleton-icon"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
        </svg>
      </div>
    </div>
  )
}

function CardImage({ card, isFetching }: { card: Card; isFetching: boolean }) {
  const [loaded, setLoaded] = useState(false)
  const rarityColor = getRarityColor(card.rarityId)

  if (!card.image) {
    return (
      <div className="card card-empty">
        <div className="card-empty-content">
          <span className="card-empty-title">
            {card.name ?? 'Unknown card'}
          </span>
          <span className="card-empty-subtitle">
            Image unavailable
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="card-image-wrapper">
      <div className="card-image-shell">
        {!loaded && (
          <div className="card-image-placeholder">
            <svg
              className="card-skeleton-icon"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z" />
            </svg>
          </div>
        )}
        <Image
          src={card.image}
          alt={card.name || 'Hearthstone card'}
          className={`card-image ${loaded ? 'is-loaded' : 'is-loading'}`}
          rootClassName="card-image-root"
          onLoad={() => setLoaded(true)}
        />
        {isFetching && (
          <div className="card-fetch-overlay" />
        )}
        <div
          className={`card-rarity-overlay ${rarityColor}`}
        />
      </div>
    </div>
  )
}

export default function CardList({ filter }: CardListProps) {
  const [page, setPage] = useState(1)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const lastCardCount = useRef(0)

  const normalizedFilter = useMemo(
    () => normalizeCardsFilter(filter, { defaultTypes: DEFAULT_TYPES }),
    [filter],
  )
  const filterSignature = useMemo(() => cardsFilterSignature(normalizedFilter), [normalizedFilter])

  const cardsParams = useMemo(
    () =>
      normalizeCardsFilter({
        ...normalizedFilter,
        page,
        limit: CARDS_PER_PAGE,
      }),
    [normalizedFilter, page],
  )

  const cardsQueryKey = useMemo(
    () => buildCardsQueryKey(normalizedFilter, page, CARDS_PER_PAGE),
    [normalizedFilter, page],
  )

  const { data: cardsData, isError, isFetching } = useQuery({
    queryKey: cardsQueryKey,
    queryFn: ({ signal }) => fetchCards(cardsParams, signal),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    gcTime: 10 * 60_000,
  })

  if (cardsData?.cardCount !== undefined) {
    lastCardCount.current = cardsData.cardCount
  }

  useEffect(() => {
    setPage(1)
  }, [filterSignature])

  if (isError) {
    return (
      <div className="cardlist-empty-state">
        <div className="cardlist-empty-icon-wrap cardlist-empty-icon-wrap--error">
          <svg className="cardlist-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="cardlist-empty-title">
          Failed to load cards
        </h3>
        <p className="cardlist-empty-description">
          An error occurred while fetching cards. Please try again later.
        </p>
      </div>
    )
  }

  const cards = cardsData?.cards ?? []
  const cardCount = cardsData?.cardCount ?? lastCardCount.current
  const currentPage = cardsData?.page ?? page
  const totalPages = getTotalPages(cardCount, cardsData?.pageCount)
  const hasNoCards = !isFetching && cards.length === 0

  useEffect(() => {
    function handlePageKeyboardNavigation(event: KeyboardEvent) {
      const nextPage = getKeyboardNavigationPage({
        currentPage,
        totalPages,
        key: event.key,
        target: event.target,
        isPreviewOpen,
        defaultPrevented: event.defaultPrevented,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
      })

      if (nextPage === null || nextPage === currentPage) {
        return
      }

      event.preventDefault()
      setPage(nextPage)
    }

    window.addEventListener('keydown', handlePageKeyboardNavigation)
    return () => window.removeEventListener('keydown', handlePageKeyboardNavigation)
  }, [currentPage, isPreviewOpen, totalPages])

  if (hasNoCards) {
    return (
      <div className="cardlist-empty-state">
        <div className="cardlist-empty-icon-wrap">
          <svg
            className="cardlist-empty-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="cardlist-empty-title">
          No cards found
        </h3>
        <p className="cardlist-empty-description">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  const slots = getCardSlots(cards, isFetching)

  return (
    <div className="cardlist">
      <div className="cardlist-grid-container">
        <div className="cardlist-grid">
          <Image.PreviewGroup
            preview={{
              onOpenChange: (visible) => setIsPreviewOpen(visible),
            }}
          >
            {slots.map((card, index) =>
              card ? (
                <CardImage key={buildCardRenderKey(card, index)} card={card} isFetching={isFetching} />
              ) : (
                <CardSkeleton keySuffix={index} key={`skeleton-${index}`} />
              ),
            )}
          </Image.PreviewGroup>
        </div>
      </div>

      <div className="cardlist-pagination-wrap">
        <CardPagination
          cardCount={cardCount}
          page={currentPage}
          onPageChange={setPage}
          disabled={isFetching && cards.length === 0}
        />
      </div>
    </div>
  )
}
