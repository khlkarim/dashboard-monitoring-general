import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Hackthon Template",
  version: packageJson.version,
  copyright: `© ${currentYear}, Hackthon Template.`,
  meta: {
    title: "Hackthon Template - Dashboard Monitoring General",
    description:
      "The Dashboard Monitoring General provides the executive board with a tool to monitor their global internal processes.",
  },
};
