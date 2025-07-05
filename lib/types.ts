export interface LaunchDetails {
  fairings: Fairings | null;
  links: Links;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number | null;
  rocket: string;
  success: boolean | null;
  failures: Failure[];
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: "hour" | "day" | "month" | "year";
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

export interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ships: string[];
}

export interface Links {
  patch: {
    small: string | null;
    large: string | null;
  };
  reddit: {
    campaign: string | null;
    launch: string | null;
    media: string | null;
    recovery: string | null;
  };
  flickr: {
    small: string[];
    original: string[];
  };
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

export interface Failure {
  time: number;
  altitude: number | null;
  reason: string;
}

export interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

export interface Launch {
  id: string;
  name: string;
  static_fire_date_utc: string | null;
  success: boolean | null;
  upcoming: boolean;
  location: string;
  rocket: string;
  orbit: string;
}



export interface singleLaunch {
  image: string;
  name: string;
  success: boolean | null;
  rocketType: string;
  rocket: string;
  details: string | null; 
  flightNumber: number;
  manufacturer: string;
  nationality: string;
  launchDate: string; // formatted date, e.g., "24 March 2006 at 22:30"
  payloadType: string;
  orbit: string;
  launchSite: string;
  wikipedia:string;
  upcoming: boolean | null;
}
