import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CardContent } from "@mui/material";

import React from "react";

function CardComponent({ title, value, description, Icon }) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex items-center justify-between">
        <CardBody>{title}</CardBody>
        <Icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default CardComponent;
