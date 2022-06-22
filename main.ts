import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts"
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts"
import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts"
import config from "./config.ts"
import exportSvg from "./generateSvg.ts"

const app = new Application()
const router = new Router()

// Enable CORS for All Routes
app.use(oakCors({
  origin: '*',
  methods: 'GET',
}))
app.use(router.routes())

router.get('/', (context) => {
  context.response.status = 404
  context.response.body = {error: 'please provide a github user/organization and github repository. Visit https://github.com/isaiah-hamilton/github-contributors for more information.'}
})

router.get('/:user', async (context) => {
  const user: string = context.params.user
  context.response.status = 404
  context.response.body = {error: `please provide a repository with the owner: ${user}. Visit https://github.com/isaiah-hamilton/github-contributors for more information.`}
})

router.get('/:user/:repo', async (context) => {
  const user: string = context.params.user
  const repo: string = context.params.repo
  const url: string = `${config.baseUrl}/${user}/${repo}/contributors`

  try {
    const response = await fetch(url)

    context.response.status = 200
    context.response.body = {message: `visit ${user}/${repo}/contributors.svg to see contributors image. Visit https://github.com/isaiah-hamilton/github-contributors for more information.`}
  } catch (error) {
    context.response.status = 404
    context.response.body = {error: error.message}
  }
})

router.get('/:user/:repo/contributors.svg', async (context) => {
  const user: string = context.params.user
  const repo: string = context.params.repo
  const per_page: string = getQuery(context).per_page || '100'
  const svgWidth: string = getQuery(context).width || '1000'
  const svgHeight: string = getQuery(context).height || '1000'
  const url: string = `${config.baseUrl}/${user}/${repo}/contributors?per_page=${per_page}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    const contributors = await data.map((contributor: { login: string, contributions: number, html_url: string, avatar_url: string }) => {
      return {
        login: contributor.login,
        count: contributor.contributions,
        url: contributor.html_url,
        avatar_url: contributor.avatar_url,
      }
    })

    exportSvg(contributors, svgWidth, svgHeight)

    context.response.status = 200
    context.response.headers.set('Content-Type', 'image/svg+xml')
    context.response.body = await Deno.readFile("./contributors.svg")
  } catch (error) {
    console.log(error)
    context.response.status = 404
    context.response.body = {error: 'user/repo not found'}
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: config.port })