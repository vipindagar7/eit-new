// Content for this area lives here — never inside components.
// Intentionally empty until real content is supplied. Do not add placeholder statistics.

export interface ClubActivity {
  id: string;
  clubId: string;
  title: string;
  date?: string;
  description?: string;
}

export const clubActivities: ClubActivity[] = [];
