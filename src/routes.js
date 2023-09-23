import Task from './models/Task.js'

import buildRoutePath from './utils/build-route-path.js'

const task = new Task()

const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: task.create
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: task.list
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: task.update
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: task.delete
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: task.complete
  }
]

export default routes