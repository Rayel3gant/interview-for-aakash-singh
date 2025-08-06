export const getOrbitData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PAYLOADS_URL! + id);
    const data = await res.json();
    return data.orbit || "Unknown";
  } catch (error) {
    console.error("Orbit error:", error);
    return "NA";
  }
};
