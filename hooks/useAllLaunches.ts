import { useQuery } from "@tanstack/react-query";
import { Launch, LaunchDetails } from "@/lib/types";
import { getLaunchPadData } from "@/functions/getLaunchPadData";
import { getRocketData } from "@/functions/getRocketData";
import { getOrbitData } from "@/functions/getOrbitData";

const fetchAllLaunchData = async (): Promise<Launch[]> => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ALL_LAUNCHES_URL!);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const launches = await res.json();

    const enrichedData = await Promise.all(
      launches.map(async (launch: LaunchDetails) => {
        const [location, rocketName, orbit] = await Promise.all([
          getLaunchPadData(launch.launchpad!),
          getRocketData(launch.rocket, 1),
          launch.payloads?.[0] ? getOrbitData(launch.payloads[0]) : "NA",
        ]);

        return {
          id: launch.id,
          name: launch.name,
          static_fire_date_utc: launch.static_fire_date_utc,
          success: launch.success,
          upcoming: launch.upcoming,
          location,
          rocket: rocketName,
          orbit,
        };
      })
    );
    return enrichedData;
  } catch (error) {
    throw error;
  }
};

export function useAllLaunches() {
  return useQuery({
    queryKey: ["launchData"],
    queryFn: fetchAllLaunchData,
    staleTime: 1 * 60 * 1000,
  });
}
