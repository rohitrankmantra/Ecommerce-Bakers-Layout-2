'use client'

import { memo, useCallback } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './cart-context'

function ProductActionsBase({ product, variant = 'button', className = '', ariaLabel }) {
  const { addItem, setIsOpen } = useCart()

  const handleAdd = useCallback(() => {
    setIsOpen(true)
    addItem(product)
  }, [addItem, setIsOpen, product])

  if (variant === 'icon') {
    return (
      <button
        onClick={handleAdd}
        className={className}
        aria-label={ariaLabel || 'Add to cart'}
        type="button"
      >
        <ShoppingBag size={18} />
      </button>
    )
  }

  return (
    <button
      onClick={handleAdd}
      className={className}
      type="button"
    >
      <ShoppingBag size={16} />
      Add
    </button>
  )
}

const ProductActions = memo(ProductActionsBase)

export default ProductActions
