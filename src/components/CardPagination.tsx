import { Pagination, Tooltip } from 'antd'

interface CardPaginationProps {
  cardCount: number
  page: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export default function CardPagination({
  cardCount,
  page,
  onPageChange,
  disabled = false,
}: CardPaginationProps) {
  function renderPaginationItem(
    _current: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactNode,
  ) {
    if (type === 'prev') {
      return (
        <Tooltip title="Previous page (Left arrow)">
          <span>{originalElement}</span>
        </Tooltip>
      )
    }

    if (type === 'next') {
      return (
        <Tooltip title="Next page (Right arrow)">
          <span>{originalElement}</span>
        </Tooltip>
      )
    }

    return originalElement
  }

  return (
    <div className={`card-pagination ${disabled ? 'is-disabled' : ''}`}>
      <span className="card-pagination-label">
        {disabled ? '-- cards' : `${cardCount.toLocaleString()} cards`}
      </span>
      <Pagination
        current={page}
        total={cardCount}
        pageSize={8}
        onChange={(newPage) => onPageChange(newPage < 1 ? 1 : newPage)}
        showSizeChanger={false}
        showLessItems
        disabled={disabled}
        size="small"
        itemRender={renderPaginationItem}
      />
    </div>
  )
}
