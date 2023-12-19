import { updateTimerState } from "@/app/features/timer/timerSlice";
import { RootState } from "@/app/store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";

function TypeTabs() {
  const dispatch = useDispatch();
  const { timerState, isPlaying } = useSelector(
    (state: RootState) => state.timer,
  );

  return (
    <Tabs
      defaultValue="pomodoro"
      className="w-[500px] text-center"
      value={timerState}
      onValueChange={(timerState) => dispatch(updateTimerState(timerState))}
    >
      <TabsList>
        <TabsTrigger value="pomodoro" disabled>
          Work
        </TabsTrigger>
        <TabsTrigger value="anime" disabled>
          Anime
        </TabsTrigger>
        <TabsTrigger value="longBreak" disabled>
          Long Break
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default TypeTabs;
