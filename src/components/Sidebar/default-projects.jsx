import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";
import { ReactComponent as ScheduledIcon } from "assets/svg/scheduled.svg";
import { ReactComponent as ImportantIcon } from "assets/svg/star.svg";
import { TodayIcon } from "components/today-icon";
import { useThemeContextValue } from "context";
import { NavLink } from "react-router-dom";
import { ProjectTasksCounts } from "./project-tasks-count";
export const DefaultProjects = () => {
  const { isLight } = useThemeContextValue();

  return (
    <div className="project-group__wrapper">
      <NavLink to={"/app/Inbox"} className={({ isActive }) => (isActive ? "active project-group" : "project-group")}>
        <div className="project-group__group">
          <div className="project-group__icon">
            <InboxIcon fill={`${isLight ? "#246fe0" : "#5297ff"}`} />
          </div>

          <div className="project-group__name">Вхідні</div>
        </div>

        <ProjectTasksCounts isDefaultGroup name={"Вхідні"} />
      </NavLink>
      <NavLink to={"/app/Today"} className={({ isActive }) => (isActive ? "active project-group" : "project-group")}>
        <div className="project-group__group">
          <div className="project-group__icon">
            <TodayIcon color={`${isLight ? "#058527" : "#25b84c"}`} />
          </div>

          <div className="project-group__name">Сьогодні</div>
        </div>

        <ProjectTasksCounts isDefaultGroup name={"Сьогодні"} />
      </NavLink>
      <NavLink to={"/app/Noted"} className={({ isActive }) => (isActive ? "active project-group" : "project-group")}>
        <div className="project-group__group">
          <div className="project-group__icon">
            <ScheduledIcon fill={`${isLight ? "#692fc2" : "#a970ff"}`} />
          </div>

          <div className="project-group__name">На вихідних</div>
        </div>
        <ProjectTasksCounts isDefaultGroup name={"На вихідних"} />
      </NavLink>
      <NavLink to={"/app/Weekend"} className={({ isActive }) => (isActive ? "active project-group" : "project-group")}>
        <div className="project-group__group">
          <div className="project-group__icon">
            <ImportantIcon stroke={`${isLight ? "#eb8909" : "#ff9a14"}`} />
          </div>

          <div className="project-group__name">Відмічені</div>
        </div>

        <ProjectTasksCounts isDefaultGroup name={"Відмічені"} />
      </NavLink>
    </div>
  );
};
