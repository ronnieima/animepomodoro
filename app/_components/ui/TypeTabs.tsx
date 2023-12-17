import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PomodoroTimer from "./timers/PomodoroTimer";
import AnimeTimer from "./timers/AnimeTimer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updateTimerState } from "@/app/features/timer/timerSlice";

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
      <TabsContent value="pomodoro">
        <PomodoroTimer />
      </TabsContent>
      <TabsContent value="anime">
        <AnimeTimer />
      </TabsContent>
    </Tabs>
  );
}

export default TypeTabs;
