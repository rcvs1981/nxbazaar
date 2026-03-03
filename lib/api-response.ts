import { NextResponse } from "next/server";

export interface ApiResponse<T> {
  success: boolean
  data: T 
  message: string
}

export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200
) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

export function errorResponse(
  message = "Something went wrong",
  status = 500
) {
  return NextResponse.json<ApiResponse<null>>(
    {
      success: false,
      data: null,
      message,
    },
    { status }
  );
}