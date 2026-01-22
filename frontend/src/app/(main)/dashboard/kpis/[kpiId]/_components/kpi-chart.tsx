"use client";

import { useState, useMemo } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon } from "lucide-react";

type ChartType = "line" | "bar" | "area";

interface KpiChartProps {
    samples: string[];
    kpiName: string;
}

export function KpiChart({ samples, kpiName }: KpiChartProps) {
    const [chartType, setChartType] = useState<ChartType>("line");

    const chartData = useMemo(() => {
        return samples.map((sample, index) => ({
            name: `#${index + 1}`,
            value: parseFloat(sample) || 0,
        }));
    }, [samples]);

    const chartConfig = {
        value: {
            label: kpiName,
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig;

    const renderChart = () => {
        switch (chartType) {
            case "bar":
                return (
                    <BarChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                    </BarChart>
                );
            case "area":
                return (
                    <AreaChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <defs>
                            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area dataKey="value" type="natural" fill="url(#fillValue)" stroke="var(--color-value)" stackId="a" />
                    </AreaChart>
                );
            case "line":
            default:
                return (
                    <LineChart data={chartData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line dataKey="value" type="natural" stroke="var(--color-value)" strokeWidth={2} dot={{ fill: "var(--color-value)" }} activeDot={{ r: 6 }} />
                    </LineChart>
                );
        }
    };

    if (chartData.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        {(() => {
                            const icons = { line: LineChartIcon, bar: BarChart3, area: AreaChartIcon };
                            const Icon = icons[chartType];
                            return <Icon className="h-5 w-5" />;
                        })()}
                        Data Visualization
                    </CardTitle>
                    <CardDescription>View samples as a chart.</CardDescription>
                </div>
                <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="line">
                            <div className="flex items-center gap-2">
                                <LineChartIcon className="h-4 w-4" />
                                Line Chart
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Bar Chart
                            </div>
                        </SelectItem>
                        <SelectItem value="area">
                            <div className="flex items-center gap-2">
                                <AreaChartIcon className="h-4 w-4" />
                                Area Chart
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    {renderChart()}
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
