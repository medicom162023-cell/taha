import { NextResponse } from 'next/server';

const WORDPRESS_NEWS_URL =
  'https://aard.ps/wp-json/wp/v2/posts?tags=44&per_page=3&_embed';

export async function GET() {
  try {
    const res = await fetch(WORDPRESS_NEWS_URL, {
      next: { revalidate: 300 },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from WordPress' },
        {
          status: res.status,
          headers: { 'Cache-Control': 'no-store' },
        },
      );
    }

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('WordPress news request failed:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
}
