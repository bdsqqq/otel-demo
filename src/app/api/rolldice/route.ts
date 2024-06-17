import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export async function GET() {
  const diceRoll = getRandomNumber(1, 6);
  return NextResponse.json(diceRoll.toString());
}