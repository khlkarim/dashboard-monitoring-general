import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Junior Entreprises",
  version: packageJson.version,
  copyright: `© ${currentYear}, Junior Entreprises.`,
  meta: {
    title: "Junior Entreprises - Dashboard Monitoring General",
    description:
      "The Dashboard Monitoring General provides the executive board with a tool to monitor their global internal processes.",
  },
};
