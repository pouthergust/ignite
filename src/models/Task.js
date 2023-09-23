import { randomUUID } from 'node:crypto'

import Database from '../Database.js'

const db = new Database()

class Task {

  constructor() {}

  create(req, res) {
    const { title, description } = req.body

    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }

    db.insert('tasks', task)

    return res.writeHead(201).end(JSON.stringify(task))
  }

  list(req, res) {
    const query = req.query
    const { title, description } = query

    const tasks = db.select('tasks', title || description ? query : null)

    return res.writeHead(200).end(JSON.stringify(tasks))
  }

  update(req, res) {
    const { id } = req.params
    const { title, description } = req.body

    const [ task ] = db.select('tasks', { id })
    if (!task) return res.writeHead(404).end('Task not found!')
    
    const taskUpdated = {
      ...task,
      title: title ?? task.title,
      description: description ?? task.description,
      updated_at: new Date()
    }

    db.update('tasks', id, taskUpdated)

    return res.writeHead(204).end(JSON.stringify(taskUpdated))
  }

  delete(req, res) {
    const { id } = req.params

    db.delete('tasks', id)
    
    return res.writeHead(204).end('Task deleted with sucess!')
  }

  complete(req, res) {
    const { id } = req.params

    const [ task ] = db.select('tasks', { id })
    if (!task) return res.writeHead(404).end('Task not found!')

    const taskUpdated = {
      ...task,
      updated_at: new Date(),
      completed_at: new Date()
    }

    db.update('tasks', id, taskUpdated)

    return res.writeHead(200).end('Completed with sucess!')
  }
}

export default Task