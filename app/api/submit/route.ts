import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const submitSchema = z.object({
  code: z.string().min(1),
  assignmentId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, assignmentId } = submitSchema.parse(body);

    // TODO: Replace this with actual user ID from authentication/session
    const userId = "REPLACE_WITH_ACTUAL_USER_ID";

    // Create submission in database
    const submission = await prisma.submission.create({
      data: {
        code,
        assignmentId,
        feedback: "Processing...", // Initial state
        userId
      },
    });

    // TODO: Call AI service for code review
    // For now, simulate AI processing
    const feedback = "AI RESPONSE HERE: YOUR CODE IS WRONG THERES MULTIPLE ERRORS LOL";

    // Update submission with feedback
    await prisma.submission.update({
      where: { id: submission.id },
      data: { feedback }
    });

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
