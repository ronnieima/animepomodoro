import { updateTimerState } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";

function TypeTabs() {
  const dispatch = useDispatch();
  const { timerState } = useSelector((state: RootState) => state.timer);

  return (
    <Tabs
      defaultValue="pomodoro"
      className="w-[500px] text-center"
      value={timerState}
      onValueChange={(value) => dispatch(updateTimerState(value))}
    >
      <TabsList>
        <TabsTrigger value="pomodoro">Work</TabsTrigger>
        <TabsTrigger value="anime">Anime</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default TypeTabs;
