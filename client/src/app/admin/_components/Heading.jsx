import { Button } from "antd";
import Link from "next/link";
import React from "react";

function Heading({ title, btnValue, link }) {
  return (
    <div className="header flex justify-between items-center">
      <div className="heading">
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
      <div className="route">
        <Button type="primary" size="larg">
          <Link href={`/admin/${link}/add`}>{btnValue}</Link>
        </Button>
      </div>
    </div>
  );
}

export default Heading;
