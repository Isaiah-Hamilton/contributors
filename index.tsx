/** @jsx h */
import { h } from "https://esm.sh/preact"
import { serve } from "https://deno.land/std@0.140.0/http/server.ts"
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json'
}

async function handler(req: Request) {
    const url = new URL(req.url)
    const user = url.pathname.split('/')[1]
    const repo = url.pathname.split('/')[2]
    const count = url.searchParams.get('count')
    const radius = url.searchParams.get('radius')
    const spacing = url.searchParams.get('spacing')
    const avatar_size = url.searchParams.get('avatar_size')
    const image_width = url.searchParams.get('image_width')
    const image_height = url.searchParams.get('image_height')

    if(!user || !repo) {
        return new Response(JSON.stringify({ error: 'Please provide a github user and repo' }), {
            headers: { ...corsHeaders },
            status: 404,
        })
    }

    const data = await fetch(`https://api.github.com/repos/${user}/${repo}/contributors${count ? `?per_page=${count}` : ''}`)
    const response = await data.json()

    if (response.message) {
        return new Response(JSON.stringify({ error: response.message }), {
            headers: { ...corsHeaders },
            status: 404,
        })
    }

    const width: number | undefined = image_width ? parseInt(image_width, 10) : undefined
    const height: number | undefined = image_height ? parseInt(image_height, 10) : undefined

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
            {response.map((contributor: any, i: number) => {
                return (
                    <img
                        key={i}
                            width={avatar_size ? avatar_size : "100"}
                            height={avatar_size ? avatar_size : "100"}
                            src={contributor.avatar_url}
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
            width: width ? width : 1200,
            height: height ? height : 600,
            status: 200,
            headers: {
                'content-type': 'image/png',
                'cache-control': 'public, max-age=31536000, s-maxage=31536000, no-transform, immutable',
                'cdn-cache-control': 'max-age=31536000',
            },
        }
    )
}

serve(handler)