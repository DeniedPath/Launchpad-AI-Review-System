import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (id) {
    // Return a single assignment with all fields for editing
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      // select all fields
    });
    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }
    return NextResponse.json({ assignment });
  }
  // Default: return all assignments (list view)
  const assignments = await prisma.assignment.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(assignments);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, requirements, creatorId, filename } = body;
  if (!title || !requirements || !filename) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  // For testing, use a default creatorId if not provided
  const admin = creatorId ?? (await prisma.adminUser.findFirst())?.id;
  if (!admin) {
    return NextResponse.json({ error: "No admin user found" }, { status: 400 });
  }
  const assignment = await prisma.assignment.create({
    data: {
      title,
      description,
      requirements,
      filename,
      creator: { connect: { id: admin } },
    },
  });
  return NextResponse.json(assignment, { status: 201 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing assignment id" }, { status: 400 });
  }
  try {
    await prisma.assignment.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete assignment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing assignment id" }, { status: 400 });
  }
  const body = await req.json();
  const { title, description, requirements, filename } = body;
  if (!title || !requirements || !filename) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const updated = await prisma.assignment.update({
      where: { id },
      data: { title, description, requirements, filename },
    });
    return NextResponse.json({ assignment: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update assignment" }, { status: 500 });
  }
}
