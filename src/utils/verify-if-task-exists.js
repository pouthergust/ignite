import Database from "../Database.js";

const db = new Database()

function verifyIfTaskExists(id) {
  const [ task ] = db.select('tasks', { id })
  if (!task) return false
  return task
}

export default verifyIfTaskExists;