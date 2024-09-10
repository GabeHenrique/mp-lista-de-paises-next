import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string
};

export default function Container({children, className}: ContainerProps): JSX.Element {
  return <div className={"items-center container max-w-6xl m-auto " + className}>{children}</div>;
}