import { Pagination } from 'antd'

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
      />
    </div>
  )
}
