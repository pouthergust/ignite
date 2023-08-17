import fs from 'node:fs/promises'

const dbPath = new URL('../db.json', import.meta.url)

class Database {
    #database = {}

    constructor() {
        fs.readFile(dbPath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(dbPath, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) {
        Array.isArray(this.#database[table]) 
            ? this.#database[table].push(data)
            : this.#database[table] = [data]

        this.#persist()

        return data
    }
} 

export default Database