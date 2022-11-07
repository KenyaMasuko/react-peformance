import { FC, memo } from 'react'
import { useQueryTasks } from '../hooks/useQueryTask'
import { TaskItemMemo } from './TaskItem'

const TaskList: FC = () => {
  const { status, data } = useQueryTasks()
  console.log('rendered TaskList')
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <ul>
      {data?.map((task) => (
        <TaskItemMemo key={task.id} task={task} />
      ))}
    </ul>
  )
}
export const TaskListMemo = memo(TaskList)
