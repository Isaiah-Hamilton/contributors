import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts"
import router from "./routing.ts"
import config from "./config.ts"

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`Listening on http://localhost:${config.port}`)
await app.listen({ port: config.port })