interface RocketDetails {
  name: string;
  type: string;
  country: string;
  company: string;
}

export async function getRocketData(id: string, type: 1): Promise<string>;
export async function getRocketData(id: string, type: 2): Promise<RocketDetails>;
export async function getRocketData(id: string, type: number): Promise<string | RocketDetails> {
  
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_ROCKET_URL! + id);

    if (!res.ok)
      throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    const rocketData: RocketDetails = {
      name: data?.name || "Unknown",
      type: data?.type || "Unknown",
      country: data?.country || "Unknown",
      company: data?.company || "Unknown",
    };

    return type === 1 ? rocketData.name : rocketData;

  } catch (error) {
    console.error("Rocket error:", error);
    return type === 1 ? "NA" : {
      name: "NA",
      type: "NA",
      country: "NA",
      company: "NA",
    };
  }
}
