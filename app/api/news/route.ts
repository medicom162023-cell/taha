import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://aard.ps/wp-json/wp/v2/posts?tags=44&per_page=3&_embed', {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch from WordPress' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
