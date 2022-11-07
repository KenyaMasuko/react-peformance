import { FormEvent, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../app/hooks'
import { useMutateTask } from '../hooks/useMutatieTask'
import { useQueryTags } from '../hooks/useQueryTags'
import { selectTask, setEditedTask } from '../slice/taskSlice'

const TaskEdit = () => {
  const editedTask = useAppSelector(selectTask)
  const dispatch = useDispatch()
  const { status, data } = useQueryTags()
  const { createTaskMutation, updateTaskMutation } = useMutateTask()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) {
      createTaskMutation.mutate(editedTask)
    } else {
      updateTaskMutation.mutate(editedTask)
    }
  }

  const tagOptions = data?.map((tag) => (
    <option key={tag.id} value={tag.id}>
      {tag.name}
    </option>
  ))

  console.log('rendered TaskEdit')

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>
  if (updateTaskMutation.isLoading) {
    return <div>Updating...</div>
  }
  if (createTaskMutation.isLoading) {
    return <div>Creating...</div>
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 border border-gray-300 px-3 py-2"
          placeholder="new task ?"
          type="text"
          onChange={(e) => {
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }}
          value={editedTask.title}
        />
        <select
          className="mb-3 border border-gray-300 px-3 py-2 block"
          value={editedTask.tag}
          onChange={(e) =>
            dispatch(
              setEditedTask({ ...editedTask, tag: Number(e.target.value) })
            )
          }
        >
          <option value={0}>Tag</option>
          {tagOptions}
        </select>
        <button
          className="my-3 mx-3 rounded bg-indigo-600 py-2 px-3 text-white hover:bg-indigo-700 disabled:opacity-40"
          disabled={!editedTask.title || !editedTask.tag}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export const TaskEditMemo = memo(TaskEdit)
