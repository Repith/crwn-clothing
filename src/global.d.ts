import React from "react";

declare module "react" {
  interface JSX {
    elementName: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
    div: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
    span: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >;
    img: React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >;
    span: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >;
  }
}
