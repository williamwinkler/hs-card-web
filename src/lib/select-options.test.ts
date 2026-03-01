import { describe, expect, it } from 'vitest'

import { toSelectOptions } from './select-options'

describe('toSelectOptions', () => {
  it('filters out incomplete items', () => {
    const options = toSelectOptions([
      { id: 1, name: 'Mage' },
      { id: 2 },
      { name: 'Priest' },
      { id: 3, name: '' },
    ])

    expect(options).toEqual([{ value: 1, label: 'Mage' }])
  })
})
