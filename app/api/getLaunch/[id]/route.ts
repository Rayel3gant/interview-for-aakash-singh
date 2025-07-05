// /app/api/getLaunch/[id]/route.ts
import { formatLaunchDate } from "@/lib/utils";
import { NextResponse } from "next/server";

const getLaunchPadData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(process.env.LAUNCHPAD_URL! + id);
    const data = await res.json();
    return data.locality || "Unknown";
  } catch (error) {
    console.error("Launchpad error:", error);
    return "NA";
  }
};

const getRocketData = async (
  id: string
): Promise<{ name: string; type: string; country: string; company: string }> => {
  try {
    const res = await fetch(process.env.ROCKET_URL! + id);
    const data = await res.json();
    return {
      name: data.name || "Unknown",
      type: data.type || "Unknown",
      country: data.country || "Unknown",
      company: data.company || "Unknown",
    };
  } catch (error) {
    console.error("Rocket error:", error);
    return {
      name: "NA",
      type: "NA",
      country: "NA",
      company: "NA",
    };
  }
};

const getOrbitAndTypeData = async (
  id: string | undefined
): Promise<{ orbit: string; type: string }> => {
  if (!id) return { orbit: "NA", type: "NA" };

  try {
    const res = await fetch(process.env.PAYLOADS_URL! + id);
    const data = await res.json();
    return {
      orbit: data.orbit || "Unknown",
      type: data.type || "Unknown",
    };
  } catch (error) {
    console.error("Payload error:", error);
    return { orbit: "NA", type: "NA" };
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const res = await fetch(process.env.ALL_LAUNCHES_URL!+id);
    const data = await res.json();

    const payloadId = data.payloads?.[0];

    const [rocketInfo, launchSite, payloadInfo] = await Promise.all([
      getRocketData(data.rocket),
      getLaunchPadData(data.launchpad),
      getOrbitAndTypeData(payloadId),
    ]);

    const responseData = {
      image: data.links?.patch?.small || "",
      name: data.name,
      success: data.success,
      upcoming: data.upcoming,
      rocket: rocketInfo.name,
      rocketType: rocketInfo.type,
      details: data.details || "",
      flightNumber: data.flight_number,
      manufacturer: rocketInfo.company,
      nationality: rocketInfo.country,
      launchDate: formatLaunchDate(data.static_fire_date_utc),
      payloadType: payloadInfo.type,
      orbit: payloadInfo.orbit,
      launchSite: launchSite,
      wikipedia: data.links?.wikipedia || "",
    };

    return NextResponse.json(
      {
        message: "Launch fetched successfully",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Failed to fetch Launch" },
      { status: 500 }
    );
  }
}
