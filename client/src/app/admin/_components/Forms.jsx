import { Button, Input } from "antd";
import React from "react";

function Forms({
  placeholderInp1,
  placeholderInp2,
  btnValue,
  handleSubmit,
  handleChange,
  data,
}) {
  return (
    <form>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="name w-1/2">
          <Input
            size="large"
            name="name"
            placeholder={placeholderInp1}
            value={data?.name}
            onChange={handleChange}
          />
        </div>
        <div className="desc">
          <Input
            size="large"
            name="description"
            placeholder={placeholderInp2}
            value={data?.description}
            onChange={handleChange}
          />
        </div>
        <div className="btn">
          <Button size="large" type="primary" onClick={handleSubmit}>
            {btnValue}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Forms;
