import { format } from "date-fns";
import { Mail } from "lucide-react";
import { User } from "@/features/users/types/users.types";
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoProps {
    user: User;
}

/** 
 * currently this is just the same code as UserInfo 
 * but its copied here because its highly likely that it will change
*/
export function AlumniInfo({ user } : UserInfoProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 flex flex-col gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                        <CardDescription>Direct contact details for this user.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-muted-foreground">Email Address</span>
                                    <span className="text-base">{user.email || "No email provided"}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium text-muted-foreground">Auth Provider</span>
                                    <span className="text-base capitalize">{user.provider || "Local"}</span>
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
                            <code className="text-xs bg-muted p-1 rounded block truncate max-w-[150px]">{user.id}</code>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="text-sm text-muted-foreground">Last Updated</span>
                            <span className="text-sm">
                                {user.updatedAt ? format(new Date(user.updatedAt), "PP") : "--"}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}