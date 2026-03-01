import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { type ApiError, buildCardsSearchParams, fetchCards, resolveApiBaseUrl } from './index'

describe('api/index', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://example.com/api/v1')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('resolves base url from env and trims trailing slash', () => {
    expect(resolveApiBaseUrl({ VITE_API_BASE_URL: 'https://example.com/api/v1/' })).toBe(
      'https://example.com/api/v1',
    )
  })

  it('throws when base url is missing outside dev mode', () => {
    expect(() => resolveApiBaseUrl({ DEV: false })).toThrow(
      'Missing VITE_API_BASE_URL. Define it in your environment for non-development builds.',
    )
  })

  it('serializes card search params', () => {
    const params = buildCardsSearchParams({
      name: 'mage',
      page: 2,
      limit: 8,
      type: [4, 7],
      keywords: [1, 2],
    })

    expect(params.toString()).toContain('name=mage')
    expect(params.toString()).toContain('page=2')
    expect(params.toString()).toContain('limit=8')
    expect(params.toString()).toContain('type=4')
    expect(params.toString()).toContain('type=7')
    expect(params.toString()).toContain('keywords=1')
    expect(params.toString()).toContain('keywords=2')
  })

  it('throws typed ApiError with status and code', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
      json: vi.fn().mockResolvedValue({ code: 1234, message: 'Rate limited' }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchCards({ page: 1, limit: 8 })).rejects.toEqual(
      expect.objectContaining<ApiError>({
        name: 'ApiError',
        status: 429,
        code: 1234,
        message: 'Rate limited',
      }),
    )
  })

  it('passes cancellation signal to fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ page: 1, pageCount: 1, cardCount: 0, cards: [] }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const controller = new AbortController()
    await fetchCards({ page: 1, limit: 8 }, controller.signal)

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    )
  })
})
