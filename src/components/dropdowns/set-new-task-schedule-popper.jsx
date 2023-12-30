import { ReactComponent as NextWeekIcon } from "assets/svg/next-week.svg";
import { ReactComponent as NoDateIcon } from "assets/svg/none.svg";
import { ReactComponent as SetScheduleIcon } from "assets/svg/set-schedule.svg";
import { ReactComponent as WeekendIcon } from "assets/svg/weekend.svg";
import { TodayIcon } from "components/today-icon";
import moment from "moment";
import "./light.scss";
import "./main.scss";


export const SetNewTaskSchedulePopper = ({ isQuickAdd, setShowPopup, setSchedule, closeOverlay, xPosition, yPosition, parentPosition }) => {
  const setNext7days = () => {
    setSchedule({ day: "Наступного тижня", date: moment().add(7, "днів").format("DD-MM-YYYY") });
    isQuickAdd ? setShowPopup(false) : closeOverlay();
  };
  const setTomorrow = () => {
    setSchedule({ day: "завтра", date: moment().add(1, "днів").format("DD-MM-YYYY") });
    isQuickAdd ? setShowPopup(false) : closeOverlay();
  };
  const setToday = () => {
    setSchedule({ day: "Сьогодні", date: moment().format("DD-MM-YYYY") });
    isQuickAdd ? setShowPopup(false) : closeOverlay();
  };
  const setWeekend = () => {
    setSchedule({ day: "Вихідні", date: moment().day("Субота").format("DD-MM-YYYY") });
    isQuickAdd ? setShowPopup(false) : closeOverlay();
  };
  const setNoDate = () => {
    setSchedule({ day: "", date: "" });
    isQuickAdd ? setShowPopup(false) : closeOverlay();
  };

  const targetedposition = parentPosition ? parentPosition : { x: xPosition, y: yPosition };

  return (
    <div
      className="option__overlay"
      onClick={(event) => {
        event.stopPropagation();
        isQuickAdd ? setShowPopup(false) : closeOverlay(event);
      }}
    >
      <div
        className="set-schedule__popper"
        onClick={(event) => event.stopPropagation()}
        style={{ top: `${targetedposition.y + 40}px`, left: `${targetedposition.x}px` }}
      >
        <ul>
          {/* // todo: change this class name to "scheduler-suggestions-item" */}
          <li className="set-schedule__popper--option" onClick={() => setToday()}>
            <div className="">
              <TodayIcon color={"#25b84c"} />
            </div>
            <p className="set-new-task__schedule--name">Сьогодні</p>
            <p className="set-new-task__schedule--weekday">{moment().format("ddd")}</p>
          </li>
          <li className="set-schedule__popper--option" onClick={() => setTomorrow()}>
            <div className="">
              <SetScheduleIcon fill={"#ff9a14"} />
            </div>

            <p className="set-new-task__schedule--name">завтра</p>
            <p className="set-new-task__schedule--weekday">{moment().add(1, "day").format("ddd")}</p>
          </li>
          <li className="set-schedule__popper--option" onClick={() => setWeekend()}>
            <div className="">
              <WeekendIcon fill={"#5297ff"} />
            </div>

            <p className="set-new-task__schedule--name"> На цих вихідних</p>
            <p className="set-new-task__schedule--weekday">сб</p>
          </li>
          <li className="set-schedule__popper--option" onClick={() => setNext7days()}>
            <div className="">
              <NextWeekIcon fill={"#a970ff"} />
            </div>

            <p className="set-new-task__schedule--name">Наступного тижня</p>
            <p className="set-new-task__schedule--weekday">{moment().add(7,"day").format("ddd MMM D ")}</p>

          </li>
          <li className="set-schedule__popper--option" onClick={() => setNoDate()}>
            <div className="">
              <NoDateIcon color={"grey"} />
            </div>

            <p className="set-new-task__schedule--name">Без дати</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
