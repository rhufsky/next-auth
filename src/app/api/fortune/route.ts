import { NextRequest, NextResponse } from "next/server";
import { getFortuneCookie } from "./fortuneCookies";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authoptions_callbacks_google";

export async function GET(req: NextRequest) {
  try {
    console.log("Got GET");
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          message: "no session",
        },
        {
          status: 401,
        }
      );
    }

    const fortune = await getFortuneCookie();

    return NextResponse.json(fortune);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  console.log("Got OPTIONS");
  return new NextResponse(null, {
    status: 204,
  });
}
