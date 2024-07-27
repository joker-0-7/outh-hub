import { Pagination } from "antd";

function PaginationComp({ current, onChange, count }) {
  return (
    <Pagination
      defaultCurrent={1}
      current={current}
      onChange={onChange}
      total={Math.round((count / 10) * 10)}
    />
  );
}

export default PaginationComp;
