import s from "./Paginator.module.scss";

type PropsType = {
  totalUsersCount: number;
  currentPage: number;
  pageSize: number;
  onPageChanged: (pageNumber: number) => void;
};

export const Paginator = (props: PropsType) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((p) => {
        return (
          <span
            className={props.currentPage === p ? s.selectedPage : ""}
            onClick={() => {
              props.onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
};
