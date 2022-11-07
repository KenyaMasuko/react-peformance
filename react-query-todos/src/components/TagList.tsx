import { memo } from 'react'
import { useQueryTags } from '../hooks/useQueryTags'
import { TagItemMemo } from './TagItem'

const TagList = () => {
  const { status, data } = useQueryTags()
  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>
  return (
    <ul>
      {data?.map((tag) => (
        <TagItemMemo key={tag.id} tag={tag} />
      ))}
    </ul>
  )
}

export const TagListMemo = memo(TagList)
