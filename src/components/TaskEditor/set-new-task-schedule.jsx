import { ReactComponent as ScheduleIcon } from "assets/svg/scheduler.svg";
import { SetNewTaskSchedulePopper } from "components/dropdowns/set-new-task-schedule-popper";
import { useOverlayContextValue } from "context";
import { useState } from "react";
export const SetNewTaskSchedule = ({ isQuickAdd, setSchedule, schedule }) => {
  const { showDialog, setShowDialog, setDialogProps } = useOverlayContextValue();
  const [showPopup, setShowPopup] = useState(false);
  const [parentPosition, setParentPosition] = useState({});
  const showQUickAddDropDown = (parentPosition) => {
    setParentPosition(parentPosition);
    setShowPopup(true);
  };

  const getDateStyle = () => {
    if (schedule?.day === "Сьогодні") {
      let day = "date__Сьогодні";
      return day;
    }
    if (schedule?.day === "завтра") {
      let day = "date__tomorrow";
      return day;
    }
    if (schedule?.day === "Вихідні") {
      let day = "date__weekend";
      return day;
    }
    if (schedule?.day === "Наступного тижня") {
      let day = "date__next-week";
      return day;
    }
  };

  return (
    <>
      <div
        className={`set-new-task__schedule ${getDateStyle()}`}
        onClick={(e) => {
          setDialogProps(Object.assign({ elementPosition: e.currentTarget.getBoundingClientRect() }, { setSchedule }));
          isQuickAdd ? showQUickAddDropDown(e.currentTarget.getBoundingClientRect()) : setShowDialog("SET_SCHEDULE");
        }}
      >
        <ScheduleIcon width={"18px"} height={"18px"} />

        {schedule?.day === "" ? "Термін виконання" : schedule?.day}
      </div>
      {showPopup && (
        <SetNewTaskSchedulePopper
          isQuickAdd={isQuickAdd}
          setShowPopup={setShowPopup}
          setSchedule={setSchedule}
          parentPosition={parentPosition}
        />
      )}
    </>
  );
};
