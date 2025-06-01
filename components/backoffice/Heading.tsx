
import React from "react";

type HeadingProps = {
  title: string;
};

export default function Heading({ title }: HeadingProps) {
  return <h1 className="text-2xl font-bold mb-4">{title}</h1>;
}
