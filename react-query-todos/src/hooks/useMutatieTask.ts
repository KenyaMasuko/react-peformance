import { useAppDispatch } from '../app/hooks'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { EditTask, Task } from '../types/types'
import { resetEditedTask } from '../slice/taskSlice'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_REST_URL}/tasks`, task),
    {
      onSuccess: (res) => {
        const prevTasks = queryClient.getQueryData<Task[]>(['tasks'])
        if (prevTasks) {
          queryClient.setQueryData<Task[]>(['tasks'], [...prevTasks, res.data])
        }
        dispatch(resetEditedTask())
      },
    }
  )
  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(
        `${process.env.REACT_APP_REST_URL}/tasks/${task.id}`,
        task
      ),
    {
      onSuccess: (res, variables) => {
        const prevTasks = queryClient.getQueryData<Task[]>(['tasks'])
        if (prevTasks) {
          queryClient.setQueryData(
            ['tasks'],
            prevTasks.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
  const deleteTaskMutation = useMutation(
    (id: number) =>
      axios.delete(`${process.env.REACT_APP_REST_URL}/tasks/${id}`),
    {
      onSuccess: (res, variables) => {
        const prevTasks = queryClient.getQueryData<Task[]>(['tasks'])
        if (prevTasks) {
          queryClient.setQueryData(
            ['tasks'],
            prevTasks.filter((task) => task.id !== variables)
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
