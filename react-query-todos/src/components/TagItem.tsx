import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useMutateTag } from '../hooks/useMutateTag'
import { setEditedTag } from '../slice/taskSlice'
import { Tag } from '../types/types'

interface Props {
  tag: Tag
}

const TagItem: FC<Props> = ({ tag }) => {
  const dispatch = useDispatch()
  const { deleteTagMutation } = useMutateTag()
  console.log('rendered TagItem')
  if (deleteTagMutation.isLoading) return <p>Deleting...</p>

  return (
    <li>
      <span className="font-bold">{tag.name}</span>
      <div className="float-right ml-20 flex">
        <PencilAltIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => {
            dispatch(
              setEditedTag({
                id: tag.id,
                name: tag.name,
              })
            )
          }}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-500"
          onClick={() => deleteTagMutation.mutate(tag.id)}
        />
      </div>
    </li>
  )
}

export const TagItemMemo = memo(TagItem)
