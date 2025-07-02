import {
  Tabs as TabsComponent,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface TabsProps {
  tabs: { value: string; label: string, content: React.ReactNode }[];
  tabDefault: string;
}

export default function Tabs({
  tabs,
  tabDefault
}: TabsProps) {
  return (
    <TabsComponent defaultValue={tabDefault} className="items-center gap-6">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger value={tab.value}>{tab.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsComponent>
  )
}
