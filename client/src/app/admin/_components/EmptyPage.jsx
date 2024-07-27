import React from "react";
import { Button, Empty } from "antd";
import Link from "next/link";
const EmptyPage = ({ link }) => (
  <div className="h-1/2 flex justify-center items-center">
    <Empty
      description={<span>No Data Available, You Can Create Data Now</span>}
    >
      <Button type="primary">
        <Link href={link}> Create Now </Link>
      </Button>
    </Empty>
  </div>
);
export default EmptyPage;
