import { ActionCard } from "./action-card";
import { useEffect, useState } from "react";
import { Risk } from "@/features/risks/types/risks.types";
import { Action } from "@/features/actions/types/actions.types";
import { ErrorDisplay } from "@/components/common/error-display";
import { ActionType } from "@/features/actions/schemas/actions.schemas";
import { useGetActions } from "@/features/actions/hooks/use-get-actions";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";

interface ActionTabsProps {
    risk: Risk;
}

export function ActionTabs({ risk }: ActionTabsProps) {
    const {
        data: actions,
        isError,
        error
    } = useGetActions(risk.id);

    const [preventiveActions, setPreventiveActions] = useState<Action[]>([]);
    const [correctiveActions, setCorrectiveActions] = useState<Action[]>([]);
    const [mesurementMethods, setMesurementMethods] = useState<Action[]>([]);

    useEffect(() => {
        if (actions) {
            setPreventiveActions(actions.data.filter((action) => action.type === ActionType.PREVENTIVE));
            setCorrectiveActions(actions.data.filter((action) => action.type === ActionType.CORRECTIVE));
            setMesurementMethods(actions.data.filter((action) => action.type === ActionType.MESUREMENT_METHOD));
        }
    }, [actions]);

    if (isError) {
        return (
            <div className="lg:col-span-8 flex flex-col gap-6">
                <ErrorDisplay
                    title={"Failed to load actions of risk: " + risk?.title}
                    error={error}
                />
            </div>
        );
    }

    return (
        <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-xl">Mitigation Actions</CardTitle>
                    <CardDescription>Manage preventive and corrective measures for this risk.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="preventive" className="w-full">
                        <div className="flex items-center justify-between mb-4">
                            <TabsList>
                                <TabsTrigger value="preventive">Preventive</TabsTrigger>
                                <TabsTrigger value="corrective">Corrective</TabsTrigger>
                                <TabsTrigger value="mesurement_method">Mesurement Methods</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="preventive" className="mt-0 space-y-4">
                            {preventiveActions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed text-muted-foreground">
                                    <p>No preventive actions recorded.</p>
                                </div>
                            ) : (
                                preventiveActions.map((action) => (
                                    <ActionCard
                                        key={action.id}
                                        action={action}
                                    />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="corrective" className="mt-0 space-y-4">
                            {correctiveActions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed text-muted-foreground">
                                    <p>No corrective actions recorded.</p>
                                </div>
                            ) : (
                                correctiveActions.map((action) => (
                                    <ActionCard
                                        key={action.id}
                                        action={action}
                                    />
                                ))
                            )}
                        </TabsContent>

                        <TabsContent value="mesurement_method" className="mt-0 space-y-4">
                            {mesurementMethods.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg border-dashed text-muted-foreground">
                                    <p>No mesurement methods recorded.</p>
                                </div>
                            ) : (
                                mesurementMethods.map((action) => (
                                    <ActionCard
                                        key={action.id}
                                        action={action}
                                    />
                                ))
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

