import { ImageResponse } from "next/og";

export const runtime = "edge";

const montserratSemiBold = fetch(
  new URL("../Montserrat-SemiBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const montserratSemiBoldFont = await montserratSemiBold;

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "dvbtrung";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor: "#171717",
          color: "#f5f5f5",
          height: "100%",
          width: "100%",
          fontSize: 100,
          fontFamily: '"Switzer"',
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title ? title : "dvbtrung"}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Montserrat",
          data: montserratSemiBoldFont,
          style: "normal",
        },
      ],
    },
  );
}
