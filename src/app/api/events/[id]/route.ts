import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: string } }) {
  try {
    const eventId = params.id;
    console.log(eventId);

    const event = await prisma.event.findUnique({
      where: {
        id: eventId
      }
    });

    return NextResponse.json(event);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
