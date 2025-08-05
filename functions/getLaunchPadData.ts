export const getLaunchPadData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_LAUNCHPAD_URL! + id);
    const data = await res.json();
    return data.locality || 'Unknown';
  } catch (error) {
    console.error('Launchpad error:', error);
    return 'NA';
  }
};
