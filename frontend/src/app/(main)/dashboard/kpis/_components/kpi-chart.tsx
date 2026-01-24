"use client";

import { useMemo } from "react";
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
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type ChartType = "line" | "bar" | "area";

interface KpiChartProps {
    samples: string[];
    kpiName: string;
}

export function KpiChart({ samples, kpiName }: KpiChartProps) {
    const { chartData, stats } = useMemo(() => {
        const values = samples.map((sample) => parseFloat(sample) || 0);
        const data = values.map((value, index) => ({
            name: `Sample ${index + 1}`,
            value,
        }));

        const min = Math.min(...values);
        const max = Math.max(...values);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        const latest = values[values.length - 1];
        const previous = values.length > 1 ? values[values.length - 2] : latest;
        const trend = latest > previous ? "up" : latest < previous ? "down" : "neutral";
        const trendPercentage = previous !== 0 ? ((latest - previous) / previous) * 100 : 0;

        return {
            chartData: data,
            stats: {
                min,
                max,
                avg,
                latest,
                trend,
                trendPercentage: Math.abs(trendPercentage),
            },
        };
    }, [samples]);

    const chartConfig = {
        value: {
            label: kpiName,
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    const formatValue = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(2)}k`;
        return value.toFixed(2);
    };

    const gradientId = `fillValue-${kpiName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;

    const renderChart = (type: ChartType) => {
        const commonProps = {
            margin: { left: -20, right: 10, top: 10, bottom: 0 },
            accessibilityLayer: true as const,
        };

        switch (type) {
            case "bar":
                return (
                    <BarChart data={chartData} {...commonProps}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            className="text-xs text-muted-foreground"
                            tickFormatter={(value) => value.replace("Sample ", "#")}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className="text-xs text-muted-foreground"
                            tickFormatter={formatValue}
                        />
                        <ChartTooltip cursor={{ fill: "hsl(var(--primary))", opacity: 0.1 }} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="value"
                            fill="var(--color-value)"
                            radius={[4, 4, 0, 0]}
                            className="transition-all duration-300"
                        />
                    </BarChart>
                );
            case "area":
                return (
                    <AreaChart data={chartData} {...commonProps}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            className="text-xs text-muted-foreground"
                            tickFormatter={(value) => value.replace("Sample ", "#")}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className="text-xs text-muted-foreground"
                            tickFormatter={formatValue}
                        />
                        <ChartTooltip cursor={{ stroke: "var(--color-value)", strokeWidth: 2 }} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Area
                            dataKey="value"
                            type="monotone"
                            fill={`url(#${gradientId})`}
                            stroke="var(--color-value)"
                            strokeWidth={2}
                            className="transition-all duration-300"
                        />
                    </AreaChart>
                );
            case "line":
            default:
                return (
                    <LineChart data={chartData} {...commonProps}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            className="text-xs text-muted-foreground"
                            tickFormatter={(value) => value.replace("Sample ", "#")}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className="text-xs text-muted-foreground"
                            tickFormatter={formatValue}
                        />
                        <ChartTooltip cursor={{ stroke: "var(--color-value)", strokeWidth: 2 }} content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Line
                            dataKey="value"
                            type="monotone"
                            stroke="var(--color-value)"
                            strokeWidth={2.5}
                            dot={{ fill: "var(--color-value)", r: 3, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                            activeDot={{ r: 5, strokeWidth: 2, stroke: "hsl(var(--background))" }}
                            className="transition-all duration-300"
                        />
                    </LineChart>
                );
        }
    };

    if (chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LineChartIcon className="h-5 w-5" />
                        Data Visualization
                    </CardTitle>
                    <CardDescription>View samples as a chart.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed rounded-lg">
                        <LineChartIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground font-medium">No data available</p>
                        <p className="text-sm text-muted-foreground mt-1">Samples will appear here once data is collected.</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const TrendIcon = stats.trend === "up" ? TrendingUp : stats.trend === "down" ? TrendingDown : Minus;
    const trendColor = stats.trend === "up" ? "text-green-500" : stats.trend === "down" ? "text-red-500" : "text-muted-foreground";

    return (
        <Card className="shadow-sm">
            <Tabs defaultValue="line" className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LineChartIcon className="h-5 w-5" />
                        {kpiName}
                    </CardTitle>
                    <CardDescription>Visualize and analyze your KPI data over time.</CardDescription>
                    <CardAction>
                        <TabsList>
                            <TabsTrigger value="line" className="gap-1.5">
                                <LineChartIcon className="h-3.5 w-3.5" />
                                Line
                            </TabsTrigger>
                            <TabsTrigger value="bar" className="gap-1.5">
                                <BarChart3 className="h-3.5 w-3.5" />
                                Bar
                            </TabsTrigger>
                            <TabsTrigger value="area" className="gap-1.5">
                                <AreaChartIcon className="h-3.5 w-3.5" />
                                Area
                            </TabsTrigger>
                        </TabsList>
                    </CardAction>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Statistics Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Latest</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold tabular-nums">{formatValue(stats.latest)}</p>
                                {chartData.length > 1 && (
                                    <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
                                        <TrendIcon className="h-3 w-3" />
                                        <span>{stats.trendPercentage.toFixed(1)}%</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Average</p>
                            <p className="text-2xl font-bold tabular-nums">{formatValue(stats.avg)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Maximum</p>
                            <p className="text-2xl font-bold tabular-nums">{formatValue(stats.max)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Minimum</p>
                            <p className="text-2xl font-bold tabular-nums">{formatValue(stats.min)}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Chart Visualization */}
                    <TabsContent value="line" className="mt-0">
                        <ChartContainer config={chartConfig} className="h-[400px] w-full">
                            {renderChart("line")}
                        </ChartContainer>
                    </TabsContent>
                    <TabsContent value="bar" className="mt-0">
                        <ChartContainer config={chartConfig} className="h-[400px] w-full">
                            {renderChart("bar")}
                        </ChartContainer>
                    </TabsContent>
                    <TabsContent value="area" className="mt-0">
                        <ChartContainer config={chartConfig} className="h-[400px] w-full">
                            {renderChart("area")}
                        </ChartContainer>
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
}
