export const getOrbitAndTypeData = async (
  id: string | undefined
): Promise<{ orbit: string; type: string }> => {
  if (!id) return { orbit: "NA", type: "NA" };

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PAYLOADS_URL! + id);
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