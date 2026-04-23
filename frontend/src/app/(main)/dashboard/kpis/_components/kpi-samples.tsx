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

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState("");
    const [newSample, setNewSample] = useState("");

    function startEdit(index: number) {
        setEditingIndex(index);
        setEditingValue(kpi.samples![index]);
    }

    async function handleUpdateConfirm() {
        if (editingIndex === null) return;

        const updatedSamples = [...kpi.samples!];
        updatedSamples[editingIndex] = editingValue;

        await updateMutation.mutateAsync({
            id: kpi.id,
            data: { samples: updatedSamples },
        });

        setEditingIndex(null);
        setEditingValue("");
    }

    async function handleDelete(index: number) {
        const updatedSamples = kpi.samples!.filter((_, i) => i !== index);

        await updateMutation.mutateAsync({
            id: kpi.id,
            data: { samples: updatedSamples },
        });
    }

    async function handleAddSample() {
        if (!newSample.trim()) return;

        const updatedSamples = kpi.samples ? [...kpi.samples, newSample.trim()] : [newSample.trim()];

        await updateMutation.mutateAsync({
            id: kpi.id,
            data: { samples: updatedSamples },
        });

        setNewSample("");
    }

    return (
        <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Chart Visualization */}
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
                    {/* Add sample */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add new sample..."
                            value={newSample}
                            onChange={(e) => setNewSample(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddSample();
                                }
                            }}
                            disabled={updateMutation.isPending}
                        />
                        <Button
                            onClick={handleAddSample}
                            disabled={
                                updateMutation.isPending || !newSample.trim()
                            }
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                        </Button>
                    </div>

                    {/* Samples list */}
                    {kpi.samples && kpi.samples.length > 0 ? (
                        <div className="space-y-2">
                            {kpi.samples.map((sample, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 border rounded-md bg-muted/20"
                                >
                                    {editingIndex === index ? (
                                        <Input
                                            value={editingValue}
                                            onChange={(e) =>
                                                setEditingValue(e.target.value)
                                            }
                                            onBlur={handleUpdateConfirm}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleUpdateConfirm();
                                                }
                                                if (e.key === "Escape") {
                                                    setEditingIndex(null);
                                                }
                                            }}
                                            autoFocus
                                            className="max-w-xs"
                                        />
                                    ) : (
                                        <span className="font-mono text-sm">
                                            {sample}
                                        </span>
                                    )}

                                    <div className="flex items-center gap-5">
                                        <span className="text-xs text-muted-foreground">
                                            Sample #{index + 1}
                                        </span>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-5 w-5 text-muted-foreground hover:text-primary"
                                            onClick={() => startEdit(index)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-5 w-5 text-muted-foreground hover:text-destructive"
                                            onClick={() => handleDelete(index)}
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
