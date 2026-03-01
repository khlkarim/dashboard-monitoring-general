import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { GeneralStatistics } from "@/features/dashboard/types/dashboard.types";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 25,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 12,
    borderBottom: 2,
    borderBottomColor: "#3b82f6",
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5,
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    backgroundColor: "#f0f9ff",
    padding: 6,
    marginBottom: 8,
    borderLeft: 3,
    borderLeftColor: "#3b82f6",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 0,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  metricValueLarge: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  barSection: {
    marginTop: 8,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  barLabel: {
    fontSize: 10,
    color: "#374151",
    width: 120,
  },
  barValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1f2937",
    width: 30,
    textAlign: "right",
  },
  barContainer: {
    flex: 1,
    marginLeft: 10,
    height: 16,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
  },
  barFill: {
    height: 16,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 25,
    right: 25,
    textAlign: "center",
    fontSize: 9,
    color: "#9ca3af",
    borderTop: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
  summaryBox: {
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    marginTop: 0,
  },
  summaryText: {
    fontSize: 10,
    color: "#1e40af",
    lineHeight: 1.4,
  },
  warningBox: {
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fecaca",
    marginTop: 8,
  },
  warningText: {
    fontSize: 10,
    color: "#991b1b",
    lineHeight: 1.4,
  },
  warningValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: 6,
  },
  riskItem: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  riskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  riskTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    flex: 1,
    marginRight: 10,
  },
  riskBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  badgeCritical: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  badgeHigh: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  badgeMedium: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  badgeLow: {
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
  },
  riskDescription: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 5,
  },
  riskMetrics: {
    flexDirection: "row",
    gap: 10,
    fontSize: 8,
    color: "#9ca3af",
  },
  noRisks: {
    textAlign: "center",
    fontSize: 10,
    color: "#9ca3af",
    padding: 20,
  },
});

interface GeneralStatisticsPDFProps {
  stats: GeneralStatistics;
}

const getPriorityBadgeStyle = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return styles.badgeCritical;
    case "high":
      return styles.badgeHigh;
    case "medium":
      return styles.badgeMedium;
    default:
      return styles.badgeLow;
  }
};

export const GeneralStatisticsPDF = ({ stats }: GeneralStatisticsPDFProps) => {
  const maxKpiCount = Math.max(...stats.kpiCountByProcessus.map((p) => p.kpiCount), 1);
  const maxRiskCount = Math.max(...stats.riskPriorityMatrix.map((r) => r.count), 1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>General Statistics Report</Text>
          <Text style={styles.subtitle}>
            Generated on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Key Metrics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Users</Text>
              <Text style={styles.metricValue}>{stats.totalUsers}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Sprint Completion Rate</Text>
              <Text style={styles.metricValue}>{stats.sprintCompletionRate}%</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Average Sprint Duration</Text>
              <Text style={styles.metricValue}>{stats.averageSprintDuration} days</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Tasks per Sprint (Avg)</Text>
              <Text style={styles.metricValueLarge}>{stats.tasksPerSprint}</Text>
            </View>
          </View>
        </View>

        {/* KPIs by Processus Section */}
        {stats.kpiCountByProcessus.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>KPIs Count by Processus</Text>
            <View style={styles.barSection}>
              {stats.kpiCountByProcessus.map((item, index) => {
                const percentage = (item.kpiCount / maxKpiCount) * 100;
                return (
                  <View key={index} style={styles.barRow}>
                    <Text style={styles.barLabel}>{item.processusLabel}</Text>
                    <Text style={styles.barValue}>{item.kpiCount}</Text>
                    <View style={styles.barContainer}>
                      <View style={[styles.barFill, { width: `${percentage}%` }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Risk Priority Matrix Section */}
        {stats.riskPriorityMatrix.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Risk Priority Matrix</Text>
            <View style={styles.barSection}>
              {stats.riskPriorityMatrix.map((item, index) => {
                const percentage = (item.count / maxRiskCount) * 100;
                return (
                  <View key={index} style={styles.barRow}>
                    <Text style={styles.barLabel}>{item.priority.toUpperCase()}</Text>
                    <Text style={styles.barValue}>{item.count}</Text>
                    <View style={styles.barContainer}>
                      <View style={[styles.barFill, { width: `${percentage}%` }]} />
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Unmitigated Risks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Unmitigated Risks ({stats.unmitigatedRisks.length})</Text>
          {stats.unmitigatedRisks.length === 0 ? (
            <Text style={styles.noRisks}>No unmitigated risks</Text>
          ) : (
            <View>
              {stats.unmitigatedRisks.map((risk, index) => (
                <View key={risk.id} style={styles.riskItem} wrap={false}>
                  <View style={styles.riskHeader}>
                    <Text style={styles.riskTitle}>{risk.title}</Text>
                    <Text style={[styles.riskBadge, getPriorityBadgeStyle(risk.priority)]}>{risk.priority}</Text>
                  </View>
                  <Text style={styles.riskDescription}>{risk.description}</Text>
                  <View style={styles.riskMetrics}>
                    <Text>Detection: {risk.detection}</Text>
                    <Text>Occurrence: {risk.occurrence}</Text>
                    <Text>Severity: {risk.severity}</Text>
                    <Text>Priority Score: {risk.priorityScore}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>
              This report provides a comprehensive overview of the organization's performance metrics.
              {"\n\n"}
              Team Size: {stats.totalUsers} user{stats.totalUsers !== 1 ? "s" : ""}
              {"\n"}
              Sprint Performance: {stats.sprintCompletionRate}% completion rate
              {"\n"}
              Average Sprint Duration: {stats.averageSprintDuration} days
              {"\n"}
              Productivity: {stats.tasksPerSprint} tasks per sprint
              {"\n\n"}
              The organization tracks {stats.kpiCountByProcessus.reduce((sum, p) => sum + p.kpiCount, 0)} KPIs across{" "}
              {stats.kpiCountByProcessus.length} processus.
              {stats.unmitigatedRisks.length > 0 &&
                `\n\nAttention Required: ${stats.unmitigatedRisks.length} risk(s) need mitigation actions.`}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Dashboard Monitoring General • Confidential Report
            {"\n"}
            Page 1 of 1
          </Text>
        </View>
      </Page>
    </Document>
  );
};
