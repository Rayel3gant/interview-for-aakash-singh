import { useQuery } from "@tanstack/react-query";
import { LaunchDetails, singleLaunch } from "@/lib/types";
import { formatLaunchDate } from "@/lib/utils";
import { getLaunchPadData } from "@/functions/getLaunchPadData";
import { getOrbitAndTypeData } from "@/functions/getOrbitAndTypeData";
import { getRocketData } from "@/functions/getRocketData";

async function fetchLaunchDetails(id: string) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ALL_LAUNCHES_URL! + id);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data: LaunchDetails = await res.json();

    const payloadId = data.payloads?.[0];

    const [rocketInfo, launchSite, payloadInfo] = await Promise.all([
      getRocketData(data.rocket, 2),
      getLaunchPadData(data.launchpad),
      getOrbitAndTypeData(payloadId),
    ]);

    const responseData: singleLaunch = {
      image: data.links?.patch?.small || "",
      name: data.name,
      success: data.success!,
      upcoming: data.upcoming,
      rocket: rocketInfo.name,
      rocketType: rocketInfo.type,
      details: data.details || "",
      flightNumber: data.flight_number,
      manufacturer: rocketInfo.company,
      nationality: rocketInfo.country,
      launchDate: formatLaunchDate(data.static_fire_date_utc!),
      payloadType: payloadInfo.type,
      orbit: payloadInfo.orbit,
      launchSite: launchSite,
      wikipedia: data.links?.wikipedia || "",
    };

    return responseData;
  } catch (error) {
    throw error;
  }
}

export function useLaunchDetails(launchId: string | null) {
  return useQuery({
    queryKey: ["singleLaunch", launchId],
    queryFn: () => fetchLaunchDetails(launchId!),
    enabled: !!launchId,
    retry: false,
  });
}
