import { describe, expect, it } from 'vitest'

import { normalizeSearchTerm } from './search'

describe('normalizeSearchTerm', () => {
  it('returns undefined for empty or whitespace search', () => {
    expect(normalizeSearchTerm('')).toBeUndefined()
    expect(normalizeSearchTerm('   ')).toBeUndefined()
  })

  it('returns trimmed value for non-empty search', () => {
    expect(normalizeSearchTerm('  mage ')).toBe('mage')
  })
})
