export interface AboutStat {
  label: string;
  value: number;
  suffix?: string;
}

export interface AboutData {
  enabled: boolean;
  bio: string[];
  image: { src: string; alt: string };
  stats: AboutStat[];
  currentlyWorkingOn: string;
  personalInterests?: string[];
}
