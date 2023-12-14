import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TypeTags() {
  return (
    <Tabs defaultValue="animepomodoro" className="w-[400px] text-center">
      <TabsList>
        <TabsTrigger value="animepomodoro">Anime Pomodoro</TabsTrigger>
        <TabsTrigger value="short break">Short Break</TabsTrigger>
        <TabsTrigger value="long break">Long Break</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default TypeTags;
