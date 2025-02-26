import jsonServer from 'json-server'
import path from 'path'

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, '../db/db.json')) // Caminho para o db.json
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)

export default (req, res) => {
  server(req, res)
}
