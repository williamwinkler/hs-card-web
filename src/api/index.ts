import type {
  Cards,
  Classes,
  Keywords,
  Rarities,
  Sets,
  Types,
} from './types'

export interface CardsListParams {
  name?: string
  manaCost?: number
  health?: number
  attack?: number
  class?: number
  rarity?: number
  type?: number[]
  keywords?: number[]
  set?: number
  page?: number
  limit?: number
}

const DEFAULT_DEV_API_BASE_URL = 'https://hscards.william-winkler.com/api/v1'
const REQUEST_TIMEOUT_MS = 10_000

interface RuntimeEnv {
  DEV?: boolean
  VITE_API_BASE_URL?: string
}

export class ApiError extends Error {
  readonly status: number
  readonly code?: number

  constructor(message: string, status: number, code?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export function resolveApiBaseUrl(env: RuntimeEnv = import.meta.env): string {
  const configuredUrl = env.VITE_API_BASE_URL?.trim()

  if (configuredUrl) {
    return validateBaseUrl(configuredUrl)
  }

  if (env.DEV) {
    return DEFAULT_DEV_API_BASE_URL
  }

  throw new Error(
    'Missing VITE_API_BASE_URL. Define it in your environment for non-development builds.',
  )
}

function validateBaseUrl(candidate: string): string {
  try {
    const parsedUrl = new URL(candidate)
    return parsedUrl.toString().replace(/\/$/, '')
  } catch {
    throw new Error(`Invalid VITE_API_BASE_URL: "${candidate}"`)
  }
}

function parseApiErrorPayload(payload: unknown): { message?: string; code?: number } {
  if (!payload || typeof payload !== 'object') {
    return {}
  }

  const objectPayload = payload as Record<string, unknown>
  const message =
    typeof objectPayload.message === 'string' ? objectPayload.message : undefined
  const code = typeof objectPayload.code === 'number' ? objectPayload.code : undefined

  return { message, code }
}

function buildPath(path: string, params?: URLSearchParams): string {
  const baseUrl = resolveApiBaseUrl()
  return params ? `${baseUrl}${path}?${params.toString()}` : `${baseUrl}${path}`
}

function connectAbortSignal(
  controller: AbortController,
  signal?: AbortSignal,
): (() => void) | undefined {
  if (!signal) {
    return
  }

  if (signal.aborted) {
    controller.abort(signal.reason)
    return
  }

  const onAbort = () => controller.abort(signal.reason)
  signal.addEventListener('abort', onAbort, { once: true })
  return () => signal.removeEventListener('abort', onAbort)
}

async function fetchJson<T>(
  path: string,
  params?: URLSearchParams,
  signal?: AbortSignal,
): Promise<T> {
  const controller = new AbortController()
  const cleanupAbort = connectAbortSignal(controller, signal)
  const timeoutId = setTimeout(() => {
    controller.abort(new Error('Request timed out'))
  }, REQUEST_TIMEOUT_MS)

  try {
    const url = buildPath(path, params)
    const response = await fetch(url, { signal: controller.signal })

    if (!response.ok) {
      let payload: unknown
      try {
        payload = await response.json()
      } catch {
        payload = undefined
      }

      const { message, code } = parseApiErrorPayload(payload)
      throw new ApiError(
        message ?? `API error: ${response.status} ${response.statusText}`,
        response.status,
        code,
      )
    }

    return (await response.json()) as T
  } finally {
    clearTimeout(timeoutId)
    cleanupAbort?.()
  }
}

export function buildCardsSearchParams(params: CardsListParams): URLSearchParams {
  const searchParams = new URLSearchParams()

  if (params.name) searchParams.set('name', params.name)
  if (params.manaCost !== undefined) searchParams.set('manaCost', String(params.manaCost))
  if (params.health !== undefined) searchParams.set('health', String(params.health))
  if (params.attack !== undefined) searchParams.set('attack', String(params.attack))
  if (params.class !== undefined) searchParams.set('class', String(params.class))
  if (params.rarity !== undefined) searchParams.set('rarity', String(params.rarity))
  if (params.type && params.type.length > 0) {
    for (const typeId of params.type) {
      searchParams.append('type', String(typeId))
    }
  }
  if (params.keywords && params.keywords.length > 0) {
    for (const keywordId of params.keywords) {
      searchParams.append('keywords', String(keywordId))
    }
  }
  if (params.set !== undefined) searchParams.set('set', String(params.set))
  if (params.page !== undefined) searchParams.set('page', String(params.page))
  if (params.limit !== undefined) searchParams.set('limit', String(params.limit))

  return searchParams
}

export function fetchCards(params: CardsListParams, signal?: AbortSignal): Promise<Cards> {
  return fetchJson<Cards>('/cards', buildCardsSearchParams(params), signal)
}

export function fetchTypes(signal?: AbortSignal): Promise<Types[]> {
  return fetchJson<Types[]>('/types', undefined, signal)
}

export function fetchKeywords(signal?: AbortSignal): Promise<Keywords[]> {
  return fetchJson<Keywords[]>('/keywords', undefined, signal)
}

export function fetchRarities(signal?: AbortSignal): Promise<Rarities[]> {
  return fetchJson<Rarities[]>('/rarities', undefined, signal)
}

export function fetchSets(signal?: AbortSignal): Promise<Sets[]> {
  return fetchJson<Sets[]>('/sets', undefined, signal)
}

export function fetchClasses(signal?: AbortSignal): Promise<Classes[]> {
  return fetchJson<Classes[]>('/classes', undefined, signal)
}
