import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ProcessusStatistics } from "@/features/processus/types/processus.types";
import { Processus } from "@/features/processus/types/processus.types";

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
  distributionSection: {
    marginTop: 0,
  },
  distributionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  distributionLabel: {
    fontSize: 11,
    color: "#374151",
    flex: 1,
  },
  distributionValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    width: 40,
    textAlign: "right",
  },
  distributionBar: {
    height: 16,
    backgroundColor: "#3b82f6",
    marginLeft: 10,
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
  profileSection: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    marginTop: 0,
    marginBottom: 0,
  },
  profileRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  profileLabel: {
    fontSize: 10,
    color: "#64748b",
    width: 120,
    fontWeight: "bold",
  },
  profileValue: {
    fontSize: 10,
    color: "#1e293b",
    flex: 1,
  },
  profileTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: 1,
    borderBottomColor: "#cbd5e1",
  },
  kpiSection: {
    marginTop: 6,
    padding: 8,
    backgroundColor: "#fefce8",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fde047",
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#713f12",
    marginBottom: 4,
  },
  kpiDescription: {
    fontSize: 9,
    color: "#854d0e",
    marginBottom: 4,
  },
  kpiInfo: {
    fontSize: 9,
    color: "#a16207",
  },
  kpiSamplesContainer: {
    marginTop: 6,
    padding: 6,
    backgroundColor: "#ffffff",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  kpiSamplesTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 4,
  },
  kpiSamplesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  sampleValue: {
    fontSize: 8,
    color: "#6b7280",
    padding: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 2,
    minWidth: 35,
    textAlign: "center",
  },
  chartContainer: {
    marginTop: 6,
    height: 80,
    position: "relative",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 8,
  },
  chartBar: {
    position: "absolute",
    bottom: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 2,
  },
  chartAxis: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: "#d1d5db",
  },
});

interface ProcessusStatisticsPDFProps {
  stats: ProcessusStatistics;
  processusId: string;
  processus?: Processus;
}

export const ProcessusStatisticsPDF = ({ stats, processusId, processus }: ProcessusStatisticsPDFProps) => {
  const getCriticalityLabel = (criticality: string) => {
    const labels: Record<string, string> = {
      critical1: "Critical 1",
      critical2: "Critical 2",
      critical3: "Critical 3",
      critical4: "Critical 4",
      critical5: "Critical 5",
      noCriticality: "No Criticality",
    };
    return labels[criticality] || criticality;
  };

  const totalTasks = Object.values(stats.taskCriticalityDistribution).reduce((a, b) => a + b, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Processus Statistics Report</Text>
          <Text style={styles.subtitle}>
            {processus?.label && `Processus: ${processus.label} • `}
            {processusId && `ID: ${processusId} • `}
            Generated on{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Processus Information Section */}
        {processus && (
          <View style={styles.profileSection}>
            <Text style={styles.profileTitle}>Processus Information</Text>

            {processus.label && (
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Label:</Text>
                <Text style={styles.profileValue}>{processus.label}</Text>
              </View>
            )}

            {processus.description && (
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Description:</Text>
                <Text style={styles.profileValue}>{processus.description}</Text>
              </View>
            )}

            {processus.createdAt && (
              <View style={styles.profileRow}>
                <Text style={styles.profileLabel}>Created:</Text>
                <Text style={styles.profileValue}>
                  {new Date(processus.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Key Metrics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Users Linked</Text>
              <Text style={styles.metricValue}>{stats.totalUsers}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total KPIs</Text>
              <Text style={styles.metricValue}>{stats.totalKpis}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Activities</Text>
              <Text style={styles.metricValue}>{stats.totalActivities}</Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Total Tasks</Text>
              <Text style={styles.metricValueLarge}>{totalTasks}</Text>
            </View>
          </View>
        </View>

        {/* KPIs Section */}
        {stats.kpisWithGraphs.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>KPI Details with Data</Text>
            {stats.kpisWithGraphs.slice(0, 5).map((kpi, index) => {
              const samples = kpi.samples || [];
              const maxSample = samples.length > 0 ? Math.max(...samples) : 0;
              const minSample = samples.length > 0 ? Math.min(...samples) : 0;
              const avgSample =
                samples.length > 0 ? (samples.reduce((a, b) => a + b, 0) / samples.length).toFixed(2) : 0;

              return (
                <View key={kpi.id} style={styles.kpiSection} wrap={false}>
                  <Text style={styles.kpiTitle}>{kpi.name}</Text>
                  {kpi.description && <Text style={styles.kpiDescription}>{kpi.description}</Text>}
                  <Text style={styles.kpiInfo}>
                    {kpi.samplingRate && `Sampling Rate: ${kpi.samplingRate} • `}
                    Samples: {samples.length}
                    {samples.length > 0 && ` • Min: ${minSample} • Max: ${maxSample} • Avg: ${avgSample}`}
                  </Text>

                  {/* Sample Values */}
                  {samples.length > 0 && (
                    <View style={styles.kpiSamplesContainer}>
                      <Text style={styles.kpiSamplesTitle}>Sample Data Points:</Text>
                      <View style={styles.kpiSamplesGrid}>
                        {samples.slice(0, 20).map((sample, idx) => (
                          <Text key={idx} style={styles.sampleValue}>
                            {sample}
                          </Text>
                        ))}
                        {samples.length > 20 && (
                          <Text style={[styles.sampleValue, { backgroundColor: "#e5e7eb" }]}>
                            +{samples.length - 20}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}

                  {/* Simple Bar Chart Visualization */}
                  {samples.length > 0 && maxSample > 0 && (
                    <View style={styles.chartContainer}>
                      <View style={styles.chartAxis} />
                      {samples.slice(0, 20).map((sample, idx) => {
                        const barHeight = (sample / maxSample) * 64;
                        const barWidth = Math.max(10, 250 / Math.min(samples.length, 20) - 2);
                        const leftPosition = 8 + idx * (250 / Math.min(samples.length, 20));

                        return (
                          <View
                            key={idx}
                            style={[
                              styles.chartBar,
                              {
                                height: barHeight,
                                width: barWidth,
                                left: leftPosition,
                              },
                            ]}
                          />
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            })}
            {stats.kpisWithGraphs.length > 5 && (
              <Text style={{ fontSize: 9, color: "#6b7280", marginTop: 10 }}>
                ... and {stats.kpisWithGraphs.length - 5} more KPI(s). Download full report for complete details.
              </Text>
            )}
          </View>
        )}

        {/* Task Criticality Distribution Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Load by Criticality</Text>
          <View style={styles.distributionSection}>
            {Object.entries(stats.taskCriticalityDistribution).map(([criticality, count]) => {
              const percentage = totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : "0.0";
              return (
                <View key={criticality} style={styles.distributionRow}>
                  <Text style={styles.distributionLabel}>{getCriticalityLabel(criticality)}</Text>
                  <Text style={styles.distributionValue}>{count}</Text>
                  <View style={{ flex: 1, marginLeft: 10, height: 16, backgroundColor: "#e5e7eb", borderRadius: 2 }}>
                    <View style={[styles.distributionBar, { width: `${percentage}%` }]} />
                  </View>
                  <Text style={{ fontSize: 10, color: "#6b7280", marginLeft: 5, width: 40, textAlign: "right" }}>
                    {percentage}%
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryText}>
              This report provides comprehensive statistics for the{" "}
              {processus?.label ? `"${processus.label}"` : "selected"} processus.
              {"\n\n"}
              Team Size: {stats.totalUsers} user{stats.totalUsers !== 1 ? "s" : ""}
              {"\n"}
              KPIs Tracked: {stats.totalKpis}
              {"\n"}
              Activities: {stats.totalActivities}
              {"\n"}
              Total Tasks: {totalTasks}
              {"\n\n"}
              The processus has {stats.kpisWithGraphs.filter((k) => k.samples && k.samples.length > 0).length} KPI(s)
              with active data collection.
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
