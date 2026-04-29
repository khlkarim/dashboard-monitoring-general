import { useState } from "react";
import { KpiChart } from "./kpi-chart";
import { FileText, Pencil, Trash2, Plus } from "lucide-react";
import { Kpi } from "@/features/kpis/types/kpis.types";
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateKpi } from "@/features/kpis/hooks/use-update-kpi";

interface KpiSamplesProps {
    kpi: Kpi;
}

export function KpiSamples({ kpi }: KpiSamplesProps) {
    const updateMutation = useUpdateKpi();

    // Editing state (triplet)
    const [editing, setEditing] = useState<{
        index: number;
        value: string;
        target: string;
        date: string;
    } | null>(null);

    // New sample state (triplet)
    const [newValue, setNewValue] = useState("");
    const [newTarget, setNewTarget] = useState("");
    const [newDate, setNewDate] = useState("");

    function startEdit(index: number) {
        setEditing({
            index,
            value: kpi.samples![index],
            target: kpi.targetSamples?.[index] ?? "",
            date: kpi.sampleDates![index],
        });
    }

    async function handleUpdateConfirm() {
        if (!editing) return;

        const { index, value, target, date } = editing;

        const updatedSamples = [...kpi.samples!];
        const updatedTargets = kpi.targetSamples
            ? [...kpi.targetSamples]
            : new Array(kpi.samples!.length).fill(null);
        const updatedDates = [...kpi.sampleDates!];

        updatedSamples[index] = value;
        updatedTargets[index] = target || null;
        updatedDates[index] = date;

        await updateMutation.mutateAsync({
            id: kpi.id,
            data: {
                samples: updatedSamples,
                targetSamples: updatedTargets,
                sampleDates: updatedDates,
            },
        });

        setEditing(null);
    }

    async function handleDelete(index: number) {
        await updateMutation.mutateAsync({
            id: kpi.id,
            data: {
                samples: kpi.samples!.filter((_, i) => i !== index),
                targetSamples: kpi.targetSamples?.filter((_, i) => i !== index),
                sampleDates: kpi.sampleDates!.filter((_, i) => i !== index),
            },
        });
    }

    async function handleAddSample() {
        if (!newValue.trim() || !newDate.trim()) return;

        const updatedSamples = kpi.samples
            ? [...kpi.samples, newValue.trim()]
            : [newValue.trim()];

        let updatedTargets = kpi.targetSamples;

        if (newTarget) {
            updatedTargets = kpi.targetSamples
                ? [...kpi.targetSamples, newTarget.trim()]
                : [newTarget.trim()];
        }

        const updatedDates = kpi.sampleDates
            ? [...kpi.sampleDates, newDate]
            : [newDate];

        await updateMutation.mutateAsync({
            id: kpi.id,
            data: {
                samples: updatedSamples,
                targetSamples: updatedTargets,
                sampleDates: updatedDates,
            },
        });

        setNewValue("");
        setNewTarget("");
        setNewDate("");
    }

    return (
        <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Chart */}
            {kpi.samples && kpi.samples.length > 0 && (
                <KpiChart samples={kpi.samples} kpiName={kpi.name} />
            )}

            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Samples History
                    </CardTitle>
                    <CardDescription>
                        Recent data points collected for this KPI.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Add Sample */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="Value"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            disabled={updateMutation.isPending}
                        />
                        <Input
                            placeholder="Target (optional)"
                            value={newTarget}
                            onChange={(e) => setNewTarget(e.target.value)}
                            disabled={updateMutation.isPending}
                        />
                        <Input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            disabled={updateMutation.isPending}
                        />
                        <Button
                            onClick={handleAddSample}
                            disabled={
                                updateMutation.isPending ||
                                !newValue.trim() ||
                                !newDate.trim()
                            }
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>

                    {/* Samples List */}
                    {kpi.samples && kpi.samples.length > 0 ? (
                        <div className="space-y-2">
                            {kpi.samples.map((sample, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 border rounded-md bg-muted/20"
                                >
                                    {editing?.index === index ? (
                                        <div className="flex gap-2">
                                            <Input
                                                value={editing.value}
                                                onChange={(e) =>
                                                    setEditing({
                                                        ...editing,
                                                        value: e.target.value,
                                                    })
                                                }
                                                className="max-w-[120px]"
                                            />
                                            <Input
                                                value={editing.target}
                                                onChange={(e) =>
                                                    setEditing({
                                                        ...editing,
                                                        target: e.target.value,
                                                    })
                                                }
                                                placeholder="Target"
                                                className="max-w-[120px]"
                                            />
                                            <Input
                                                type="date"
                                                value={editing.date}
                                                onChange={(e) =>
                                                    setEditing({
                                                        ...editing,
                                                        date: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-sm font-mono">
                                            <div>Value: {sample}</div>
                                            <div>
                                                Target:{" "}
                                                {kpi.targetSamples?.[index] ??
                                                    "-"}
                                            </div>
                                            <div>
                                                Date:{" "}
                                                {kpi.sampleDates?.[index]}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-5">
                                        <span className="text-xs text-muted-foreground">
                                            Sample #{index + 1}
                                        </span>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-5 w-5"
                                            onClick={() =>
                                                editing?.index === index
                                                    ? handleUpdateConfirm()
                                                    : startEdit(index)
                                            }
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-5 w-5 text-destructive"
                                            onClick={() =>
                                                handleDelete(index)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">
                                No samples recorded yet.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}