import { FC } from 'react'
import { ClassicalFetchA } from './ClassicalFetchA'
import { ClassicalFetchB } from './ClassicalFetchB'
import { DarkContextA } from './DarkContextA'
import { DarkContextB } from './DarkContextB'

export const MainDarkContext: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-40">
      <ClassicalFetchA />
      <ClassicalFetchB />
      <DarkContextA />
      <DarkContextB />
    </div>
  )
}
