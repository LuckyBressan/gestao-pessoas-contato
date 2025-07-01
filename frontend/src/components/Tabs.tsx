import {
  Tabs as TabsComponent,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface TabsProps {
  tabs: { value: string; label: string, content: React.ReactNode }[],
}

export default function Tabs({
  tabs
}: TabsProps) {
  return (
    <TabsComponent defaultValue="tab-1" className="items-center">
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
