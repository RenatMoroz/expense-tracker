import { NextRequest, NextResponse } from 'next/server';
import { globalApi } from '../../serverConfig';
import { cookies } from 'next/headers';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();

    const response = await globalApi.delete(`/transactions/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(response.data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      error?.response?.data || { message: 'Failed to delete transaction' },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    const cookieStore = await cookies();

    const response = await globalApi.patch(`/transactions/${id}`, body, {
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(response.data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      error?.response?.data || { message: 'Failed to update transaction' },
      { status: error?.response?.status || 500 }
    );
  }
}
