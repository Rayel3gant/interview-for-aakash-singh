'use server';
import {  LaunchDetails } from '@/lib/types';
import { NextResponse } from 'next/server';

const getLaunchPadData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(process.env.LAUNCHPAD_URL! + id);
    const data = await res.json();
    return data.locality || 'Unknown';
  } catch (error) {
    console.error('Launchpad error:', error);
    return 'NA';
  }
};

const getRocketData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(process.env.ROCKET_URL! + id);
    const data = await res.json();
    return data.name || 'Unknown';
  } catch (error) {
    console.error('Rocket error:', error);
    return 'NA';
  }
};

const getOrbitData = async (id: string): Promise<string> => {
  try {
    const res = await fetch(process.env.PAYLOADS_URL! + id);
    const data = await res.json();
    return data.orbit || 'Unknown';
  } catch (error) {
    console.error('Orbit error:', error);
    return 'NA';
  }
};

export async function GET() {
  try {
    const res = await fetch(process.env.ALL_LAUNCHES_URL!);
    const launches = await res.json();

    console.log("fetching from api");

    // Fetch and enrich all launch data in parallel
    const enrichedData = await Promise.all(
      launches.map(async (launch: LaunchDetails) => {
        const [location, rocketName, orbit] = await Promise.all([
          getLaunchPadData(launch.launchpad!),
          getRocketData(launch.rocket),
          launch.payloads?.[0] ? getOrbitData(launch.payloads[0]) : 'NA',
        ]);

        return {
          id: launch.id,
          name: launch.name,
          static_fire_date_utc:launch.static_fire_date_utc,
          success: launch.success,
          upcoming: launch.upcoming,
          location,
          rocket: rocketName,
          orbit,
        };
      })
    );


    return NextResponse.json(
      {
        message: 'Data enriched and fetched successfully',
        data: enrichedData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
