// /app/api/getLaunch/[id]/route.ts
import { formatLaunchDate } from "@/lib/utils";
import { NextResponse } from "next/server";

const getLaunchPadData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(`https://api.spacexdata.com/v4/launchpads/${id}`);
    const data = await res.json();
    return data.locality || 'Unknown';
  } catch (error) {
    console.error('Launchpad error:', error);
    return 'NA';
  }
};

const getRocketData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
    const data = await res.json();
    return data.name || 'Unknown';
  } catch (error) {
    console.error('Rocket error:', error);
    return 'NA';
  }
};

const getOrbitAndTypeData = async (id: string): Promise<{ orbit: string; type: string }> => {
  try {
    const res = await fetch(`https://api.spacexdata.com/v4/payloads/${id}`);
    const data = await res.json();
    return {
      orbit: data.orbit || 'Unknown',
      type: data.type || 'Unknown',
    };
  } catch (error) {
    console.error('Payload error:', error);
    return { orbit: 'NA', type: 'NA' };
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch main launch data
    const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
    const data = await res.json();

    // Get first payload ID safely
    const payloadId = data.payloads?.[0];

    // Run dependent fetches in parallel
    const [rocketName, launchSite, payloadInfo] = await Promise.all([
      getRocketData(data.rocket),
      getLaunchPadData(data.launchpad),
      getOrbitAndTypeData(payloadId)
    ]);

    const responseData = {
      image: data.links?.patch?.small || "",
      name: data.name,
      success: data.success,
      rocketType:"",
      rocket: rocketName,
      details: data.details || "",
      flightNumber: data.flight_number,
      manufacturer: "SpaceX",
      nationality: "SpaceX",
      launchDate: formatLaunchDate(data.static_fire_date_utc),
      payloadType: payloadInfo.type,
      orbit: payloadInfo.orbit,
      launchSite: launchSite
    };

    return NextResponse.json(
      {
        message: "Launch fetched successfully",
        data:responseData,
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
