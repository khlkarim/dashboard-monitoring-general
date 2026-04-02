import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function SecurityTips() {
    return (
        <div className="lg:col-span-4 space-y-6">
            <Card className="bg-muted/50 border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-lg">Security Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4 text-muted-foreground">
                    <p>* Use at least 6 characters</p>
                    <p>* Mix uppercase and lowercase letters</p>
                    <p>* Include numbers and symbols</p>
                    <p>* Don't use common words or birthdays</p>
                </CardContent>
            </Card>
        </div>
    );
}
