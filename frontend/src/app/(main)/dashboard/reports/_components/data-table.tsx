import * as React from "react";
import { FileJson, FileSpreadsheet } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";

import { DataTable as DataTableNew } from "../../../../../components/data-table/data-table";
import { DataTablePagination } from "../../../../../components/data-table/data-table-pagination";
import { DataTableViewOptions } from "../../../../../components/data-table/data-table-view-options";

import { sprintColumns, taskColumns, riskColumns, userColumns, kpiColumns } from "./columns";
import { ReportPDF } from "./report-pdf";

interface DataTableProps {
  fullData: {
    sprints: any[];
    tasks: any[];
    risks: any[];
    kpis: any[];
    users: any[];
  };
}

export function DataTable({ fullData }: DataTableProps) {
  const [activeTab, setActiveTab] = React.useState("sprints");

  const getTableData = () => {
    switch (activeTab) {
      case "sprints": return fullData.sprints;
      case "tasks": return fullData.tasks;
      case "risks": return fullData.risks;
      case "users": return fullData.users;
      case "kpis": return fullData.kpis;
      default: return [];
    }
  };

  const getColumns = () => {
    switch (activeTab) {
      case "sprints": return sprintColumns;
      case "tasks": return taskColumns;
      case "risks": return riskColumns;
      case "users": return userColumns;
      case "kpis": return kpiColumns;
      default: return [];
    }
  };

  const data = getTableData();
  const columns = getColumns() as any;
  const table = useDataTableInstance({ data, columns, getRowId: (row) => row.id });

  const exportToCSV = () => {
    const currentData = getTableData();
    if (currentData.length === 0) return;

    const headers = Object.keys(currentData[0]).join(",");
    const rows = currentData.map(row =>
      Object.values(row).map(value =>
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      ).join(",")
    ).join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="sprints">Sprints</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              <FileSpreadsheet className="size-4 mr-2" />
              Export CSV
            </Button>

            <PDFDownloadLink document={<ReportPDF data={fullData} />} fileName="project-report.pdf">
              {({ loading }) => (
                <Button variant="outline" size="sm" disabled={loading}>
                  <FileJson className="size-4 mr-2" />
                  {loading ? "Loading..." : "Export PDF"}
                </Button>
              )}
            </PDFDownloadLink>

            <DataTableViewOptions table={table} />
          </div>
        </div>

        <TabsContent value={activeTab} className="relative flex flex-col gap-4">
          <div className="overflow-hidden rounded-lg border">
            <DataTableNew table={table} columns={columns} />
          </div>
          <DataTablePagination table={table} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
