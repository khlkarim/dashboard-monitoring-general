"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigationStore } from "@/navigation/store/navigation.store";
import { withAuth } from "@/features/auth/components/guards/withAuth";
import { ArrowLeft, Calendar, Mail, Shield, User as UserIcon } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetUserById } from "@/features/users/hooks/use-get-user-by-id";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AlumniDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { removeSubNavItem } = useNavigationStore();

    const alumniId = params.alumniId as string;
    const { data: alumni, isLoading, error } = useGetUserById({ id: alumniId });

    const handleClose = () => {
        if (alumni) {
            // Remove from navigation sidebar
            removeSubNavItem(2, "Alumnis", `${alumni.firstName} ${alumni.lastName}`);
        }
        // Navigate back to alumni list page
        router.push("/dashboard/alumni");
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                    <Skeleton className="h-32 col-span-1" />
                </div>
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    if (error || !alumni) {
        return (
            <div className="flex flex-col gap-6 p-6 items-center justify-center min-h-[50vh]">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription>{error?.message || "Alumni not found"}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleClose} variant="secondary" className="w-full">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Alumni List
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const fullName = `${alumni.firstName || ""} ${alumni.lastName || ""}`.trim() || "Unknown User";

    return (
        <div className="flex flex-col gap-6 p-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard')}>Dashboard</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="cursor-pointer hover:text-foreground transition-colors" onClick={() => router.push('/dashboard/alumni')}>Alumni</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground font-medium truncate max-w-[200px]">{fullName}</span>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary/10">
                            <AvatarImage src={alumni.photo?.path} alt={fullName} />
                            <AvatarFallback className="text-lg bg-primary/5">
                                {alumni.firstName?.[0]}{alumni.lastName?.[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-muted-foreground">
                                    {alumni.role?.name || "No Role"}
                                </Badge>
                                {alumni.status && (
                                    <Badge variant={alumni.status.name === 'Active' ? 'default' : 'secondary'}>
                                        {alumni.status.name}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleClose} variant="ghost">
                            Close
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Role</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{alumni.role?.name || "--"}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            System Access Level
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{alumni.status?.name || "--"}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Current Account State
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Joined On</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{alumni.createdAt ? format(new Date(alumni.createdAt), "MMM d, yyyy") : "--"}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Registration Date
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Contact Information
                            </CardTitle>
                            <CardDescription>Direct contact details for this alumni.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Email Address</span>
                                        <span className="text-base">{alumni.email || "No email provided"}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-medium text-muted-foreground">Auth Provider</span>
                                        <span className="text-base capitalize">{alumni.provider || "Local"}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">User ID</span>
                                <code className="text-xs bg-muted p-1 rounded block truncate max-w-[150px]">{alumni.id}</code>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Last Updated</span>
                                <span className="text-sm">
                                    {alumni.updatedAt ? format(new Date(alumni.updatedAt), "PP") : "--"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default withAuth(AlumniDetailPage);
