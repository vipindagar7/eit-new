import { SITE_NAME, SITE_URL } from "@/lib/constants";

export interface SiteConfig {
  name: string;
  shortName: string;
  acronym: string;
  city: string;
  url: string;
  description: string;
  /** Recognition statements shown in the top bar and footer. */
  affiliations: string[];
  contact: { address: string; phone: string; email: string };
}

/**
 * Institute-level facts used by the layout, metadata and footer.
 * Anything left empty is simply not rendered — fill it in when confirmed.
 */
export const siteConfig: SiteConfig = {
  name: SITE_NAME,
  shortName: "EIT Faridabad",
  acronym: "EIT",
  city: "Faridabad",
  url: SITE_URL,
  description:
    "Echelon Institute of Technology (EIT), Faridabad — engineering and management education, admissions, placements and campus life.",

  affiliations: ["Approved by AICTE", "Affiliated to GGSIPU"],

  contact: {
    address: "",
    phone: "",
    email: "",
  },

};
