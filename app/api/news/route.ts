import { publicWordPressFetch } from '@/lib/public-wordpress-fetch';
import { NextResponse } from 'next/server';

const AARD_NEWS_URL = 'https://aard.ps/wp-json/aard/v1/news?per_page=3';

export async function GET() {
  try {
    const res = await publicWordPressFetch(AARD_NEWS_URL);

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from AARD Headless API' },
        {
          status: res.status,
          headers: { 'Cache-Control': 'no-store' },
        },
      );
    }

    const data = (await res.json()) as { items?: unknown[] };

    return NextResponse.json(data.items ?? [], {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('AARD news request failed:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      },
    );
  }
}
