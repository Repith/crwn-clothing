//SVG PATTERN
//declaring module and exports to available SVG implementation
//more in TS docs to read

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
