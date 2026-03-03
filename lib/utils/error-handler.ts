import { ZodError } from "zod"
import { NextResponse } from "next/server"

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: error.flatten(),
      },
      { status: 422 }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  )
}