import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTag } from '../slice/taskSlice'
import { Tag } from '../types/types'

export const useMutateTag = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTagMutation = useMutation(
    (tag: Omit<Tag, 'id'>) =>
      axios.post<Tag>(`${process.env.REACT_APP_REST_URL}/tags`, tag),
    {
      onSuccess: (res) => {
        const prevTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (prevTags) {
          queryClient.setQueryData<Tag[]>(['tags'], [...prevTags, res.data])
        }
        dispatch(resetEditedTag())
      },
    }
  )

  const updateTagMutation = useMutation(
    (tag: Tag) =>
      axios.put<Tag>(`${process.env.REACT_APP_REST_URL}/tags/${tag.id}`),
    {
      onSuccess: (res, variables) => {
        const prevTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (prevTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            prevTags.map((tag) => (tag.id === variables.id ? res.data : tag))
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  const deleteTagMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tags/${id}`),
    {
      onSuccess: (res, variables) => {
        const prevTags = queryClient.getQueryData<Tag[]>(['tags'])
        if (prevTags) {
          queryClient.setQueryData<Tag[]>(
            ['tags'],
            prevTags.filter((tag) => tag.id !== variables)
          )
        }
        dispatch(resetEditedTag())
      },
    }
  )

  return { createTagMutation, updateTagMutation, deleteTagMutation }
}
