import { useQuery } from "@tanstack/react-query";

async function fetchLaunchDetails(id:string){
    try {
        const res = await fetch(`/api/getLaunch/${id}`); 
        const data = await res.json();
        if (!res.ok) {
        throw new Error('Network response was not ok');
        }
    return data.data;
  } catch (error) {
    throw error;
  }
}
 
export function useLaunchDetails(launchId:string | null) {
    return useQuery({
        queryKey: ['singleLaunch',launchId],
        queryFn: () => fetchLaunchDetails(launchId!),
        enabled: !!launchId,  
        retry: false,
    });
}
