// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface Patent {
  id: string;
  title: string;
  inventors: string[];
  status?: string;
  applicationNumber?: string;
  year?: number;
}

export const patents: Patent[] = [];
