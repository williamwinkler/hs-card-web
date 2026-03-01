import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import type { CardsListParams } from '~/api'
import CardFilter from '~/components/CardFilter'
import CardList from '~/components/CardList'

export const Route = createFileRoute('/')({
  component: Cards,
})

function Cards() {
  const [filter, setFilter] = useState<CardsListParams>({})

  return (
    <div className="cards-page">
      {/* Filters Section */}
      <div className="cards-page-filter-panel">
        <CardFilter updateFilter={setFilter} />
      </div>

      {/* Cards Section */}
      <div className="cards-page-list-panel">
        <CardList filter={filter} />
      </div>
    </div>
  )
}
