import React from "react";

import ActionLink from "../common/ActionLink";
import logo from "../images/logo.svg";
import compactLogo from "../images/logo-compact.svg";
import { LinkWithAction } from "../types";

interface LogoProps {
  accentColor?: string;
  link?: LinkWithAction;
}
export default function Logo(props: LogoProps) {
  const { accentColor, link } = props;
  return (
    <ActionLink link={link}>
      <div className="logo">
        <img alt="logo" src={logo} className={`regular`} />
        <img alt="logo" src={compactLogo} className={`compact`} />
      </div>
      <style jsx>{`
        .logo {
          position: relative;
          cursor: pointer;
          filter: drop-shadow(3px 3px 0px ${accentColor || "transparent"});
          padding-right: 5px;
        }
        .logo > img {
          height: 100%;
          z-index: 2;
          position: relative;
        }
        .logo .regular {
          width: 87px;
        }
        .logo .compact {
          display: none;
        }
        @media only screen and (max-width: 950px) {
          .logo .regular {
            display: none;
          }
          .logo .compact {
            display: block;
            width: 35px;
            height: 40px;
          }
        }
        @media only screen and (max-width: 450px) {
          .logo {
            display: none;
          }
        }
      `}</style>
    </ActionLink>
  );
}
