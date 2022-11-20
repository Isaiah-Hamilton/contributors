import type { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const user: string | null = searchParams.get('user')
  const repo: string | null = searchParams.get('repo')
  const count: string | null = searchParams.get('count')
  const radius: string | null = searchParams.get('radius')
  const spacing: string | null = searchParams.get('spacing')
  const image_size: string | null = searchParams.get('image_size')
  const screen_width: string | null = searchParams.get('screen_width')
  const screen_height: string | null = searchParams.get('screen_height')

  const width: number | undefined = screen_width ? parseInt(screen_width, 10) : undefined
  const height: number | undefined = screen_height ? parseInt(screen_height, 10) : undefined

  const git = await fetch(`https://api.github.com/repos/${user}/${repo}/contributors${count?.length ? `?per_page=${count}` : ''}`)
  const arr = await git.json()

  if (arr.message) {
    return new Response(
      JSON.stringify({
        message: "repository not found"
      }),
      {
        status: 404,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }

  const contributor = await arr.map((contributor: { id: number, login: string; avatar_url: string }) => {
      return {
        id: contributor.id,
        user: contributor.login,
        avatar: contributor.avatar_url,
      }
    }
  )

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        {contributor.map((contributor: any, i: number) => {
          return (
              <img
              key={i}
                width={image_size ? image_size : "100"}
                height={image_size ? image_size : "100"}
                src={contributor.avatar}
                style={{
                  borderRadius: radius ? radius : 130,
                  margin: spacing ? spacing : '0.5rem'
                }}
              />
          )
        })}
      </div>
    ),
    {
      width: screen_width ? width : 1200,
      height: screen_height ? height : 600
    }
  )
}
