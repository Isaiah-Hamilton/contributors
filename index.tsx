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
    const startTime = Date.now(); // Record start time

    const url = new URL(req.url)
    const user = url.pathname.split('/')[1]
    const repo = url.pathname.split('/')[2]
    const count = url.searchParams.get('count')
    const width = url.searchParams.get('width')
    const height = url.searchParams.get('height')
    const radius = url.searchParams.get('radius')
    const spacing = url.searchParams.get('spacing')
    const avatar_size = url.searchParams.get('avatar_size')

    if (!user || !repo) {
        const errorResponse = new Response(JSON.stringify({ error: 'Please provide a github user and repo' }), {
            headers: { ...corsHeaders },
            status: 404,
        });

        logRequestInfo(req, startTime);
        return errorResponse;
    }

    const data = await fetch(`https://api.github.com/repos/${user}/${repo}/contributors${count ? `?per_page=${count}` : ''}`)
    const response = await data.json()

    if (response.message) {
        const errorResponse = new Response(JSON.stringify({ error: response.message }), {
            headers: { ...corsHeaders },
            status: 404,
        });

        logRequestInfo(req, startTime);
        return errorResponse;
    }

    const convertToNumber = (value: string | null) => {
        if (value) {
            return Number(value)
        }
        return null
    }

    const imageResponse = new ImageResponse(
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
                                borderRadius: radius ? radius : 50,
                                margin: spacing ? spacing : '0.5rem'
                            }}
                        />
                    )
                })}
            </div>
        ),
        {
            width: width ? convertToNumber(width) : 1200,
            height: height ? convertToNumber(height) : 600,
            status: 200,
            headers: {
                'content-type': 'image/png',
                'cache-control': 'public, max-age=31536000, s-maxage=31536000, no-transform, immutable',
                'cdn-cache-control': 'max-age=31536000',
            },
        }
    );

    logRequestInfo(req, startTime);
    return imageResponse;
}

function logRequestInfo(req: Request, startTime: number) {
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    console.log(`URL: ${req.url}, Response Time: ${elapsedTime}ms`);
}

serve(handler);
