import { useQuery } from "@tanstack/react-query";

const fetchAllLaunchData=async()=> {
  try {
    const res = await fetch('/api/launchData');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
}

export function useAllLaunches() {
    return useQuery({
        queryKey: ['launchData'],
        queryFn: fetchAllLaunchData,
        staleTime: 1 * 60 * 1000,
    });
}

