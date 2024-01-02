import React from 'react'
import { CategoryTag } from './CategoryTag'
import { BebidasIcon, EmpanadasIcon, HamburguesasIcon, PizzaIcon, TodoIcon } from '@components/Icons'

export const CategoriesFilter: React.FC = () => {
  return (
    <div className='flex gap-2 mt-12 overflow-x-auto'>
      <CategoryTag tagName='Todo' icon={<TodoIcon />} />
      <CategoryTag tagName='Pizzas' icon={<PizzaIcon />} />
      <CategoryTag tagName='Hamburguesas' icon={<HamburguesasIcon />} />
      <CategoryTag tagName='Empanadas' icon={<EmpanadasIcon />} />
      <CategoryTag tagName='Bebidas' icon={<BebidasIcon />} />
    </div>
  )
}