import type { LucideProps } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React from "react";
import Text from "./Text";

export type CardType = {
    title: string;
    Icon : React.FC<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    data : number | string;
    description: string;
}

interface SectionCardsProps {
    cards: CardType[];
}

export default function SectionCards({
    cards
} : SectionCardsProps) {
    return (
        <section
            key='section-cards'
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {
                cards.map(({ Icon, ...card }) => (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <Text as="h1" variant={'body-md-bold'}>
                                    {card.title}
                                </Text>
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Text as="div" variant={'body-md-bold'} className="text-4xl!">
                                {card.data}
                            </Text>
                            <Text as="p" variant={'body-sm'} className="text-muted-foreground!">
                                {card.description}
                            </Text>
                            {/* <p className="text-xs text-muted-foreground"></p> */}
                        </CardContent>
                    </Card>
                ))
            }
        </section>
    )
};
