import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts"
import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts"
import generateSvg from "./generateSvg.ts"
import config from "./config.ts"

const router = new Router()

router.get("/", async (context) => {
  context.response.status = 404
  context.response.body = { error: "please provide a github user and repository" }
})

router.get("/:user", async (context) => {
  const user: string = context.params.user
  context.response.status = 404
  context.response.body = {error: `please provide a repository with the owner: ${user}`}
})

router.get("/:user/:repo", async (context) => {
  const user: string = context.params.user
  const repo: string = context.params.repo
  const perPage: string = getQuery(context).per_page || '100'
  const svgWidth: string = getQuery(context).width || '1000'
  const svgHeight: string = getQuery(context).height || '1000'
  const url: string = `${config.baseUrl}/${user}/${repo}/contributors?per_page=${perPage}`

  const response = await fetch(url)
  const data = await response.json()

  if (data.length === undefined) {
    context.response.status = 404
    context.response.body = {error: `no contributors found for ${user}/${repo}`}
  } else {
    context.response.status = 200
    context.response.headers.set('Content-Type', 'image/svg+xml')
    context.response.body = generateSvg(data, svgWidth, svgHeight)
  }
})

export default router