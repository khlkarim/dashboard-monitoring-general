import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        borderBottom: 2,
        borderBottomColor: '#3b82f6',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
        marginTop: 5,
    },
    section: {
        marginTop: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
        backgroundColor: '#f0f9ff',
        padding: 8,
        marginBottom: 10,
        borderLeft: 3,
        borderLeftColor: '#3b82f6',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    metricCard: {
        width: '48%',
        backgroundColor: '#f9fafb',
        padding: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 10,
    },
    metricLabel: {
        fontSize: 10,
        color: '#6b7280',
        marginBottom: 5,
    },
    metricValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    metricValueLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3b82f6',
    },
    metricValueDanger: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ef4444',
    },
    distributionSection: {
        marginTop: 15,
    },
    distributionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    distributionLabel: {
        fontSize: 11,
        color: '#374151',
        flex: 1,
    },
    distributionValue: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1f2937',
        width: 40,
        textAlign: 'right',
    },
    distributionBar: {
        height: 16,
        backgroundColor: '#3b82f6',
        marginLeft: 10,
        borderRadius: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 9,
        color: '#9ca3af',
        borderTop: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 10,
    },
    summaryBox: {
        backgroundColor: '#eff6ff',
        padding: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#bfdbfe',
        marginTop: 10,
    },
    summaryText: {
        fontSize: 10,
        color: '#1e40af',
        lineHeight: 1.5,
    },
    profileSection: {
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        marginTop: 15,
        marginBottom: 20,
    },
    profileRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    profileLabel: {
        fontSize: 10,
        color: '#64748b',
        width: 120,
        fontWeight: 'bold',
    },
    profileValue: {
        fontSize: 10,
        color: '#1e293b',
        flex: 1,
    },
    profileTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottom: 1,
        borderBottomColor: '#cbd5e1',
    },
    badge: {
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 3,
        fontSize: 9,
        fontWeight: 'bold',
    },
});

interface MemberStatisticsPDFProps {
    stats: {
        totalTasks: number;
        taskStatusDistribution: {
            TODO?: number;
            IN_PROGRESS?: number;
            DONE?: number;
            BLOCKED?: number;
        };
        overdueTasks: number;
        completionRate: number;
        engagementScore: number;
        averageCompletionTime: number;
        completedThisMonth: number;
        onTimeRate: number;
    };
    userName?: string;
    userId?: string;
    user?: {
        id: string;
        email: string | null;
        firstName: string | null;
        lastName: string | null;
        role?: { id?: string; name?: string | null } | null;
        status?: { id?: string; name?: string | null } | null;
        workplace?: string | null;
        mandate?: string | null;
        createdAt?: string;
    };
}

export const MemberStatisticsPDF = ({ stats, userName, userId, user }: MemberStatisticsPDFProps) => {
    const getStatusLabel = (status: string) => {
        const labels: Record<string, string> = {
            TODO: 'To Do',
            IN_PROGRESS: 'In Progress',
            DONE: 'Done',
            BLOCKED: 'Blocked',
        };
        return labels[status] || status;
    };

    const getPerformanceRating = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Member Performance Report</Text>
                    <Text style={styles.subtitle}>
                        {userName && `Member: ${userName} • `}
                        {userId && `ID: ${userId} • `}
                        Generated on {new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </Text>
                </View>

                {/* Profile Information Section */}
                {user && (
                    <View style={styles.profileSection}>
                        <Text style={styles.profileTitle}>Profile Information</Text>
                        
                        {(user.firstName || user.lastName) && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Full Name:</Text>
                                <Text style={styles.profileValue}>
                                    {[user.firstName, user.lastName].filter(Boolean).join(' ')}
                                </Text>
                            </View>
                        )}
                        
                        {user.email && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Email:</Text>
                                <Text style={styles.profileValue}>{user.email}</Text>
                            </View>
                        )}
                        
                        {user.role?.name && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Role:</Text>
                                <Text style={styles.profileValue}>{user.role.name}</Text>
                            </View>
                        )}
                        
                        {user.workplace && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Workplace:</Text>
                                <Text style={styles.profileValue}>{user.workplace}</Text>
                            </View>
                        )}
                        
                        {user.mandate && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Mandate:</Text>
                                <Text style={styles.profileValue}>{user.mandate}</Text>
                            </View>
                        )}
                        
                        {user.status?.name && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Status:</Text>
                                <Text style={styles.profileValue}>{user.status.name}</Text>
                            </View>
                        )}
                        
                        {user.createdAt && (
                            <View style={styles.profileRow}>
                                <Text style={styles.profileLabel}>Member Since:</Text>
                                <Text style={styles.profileValue}>
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Key Metrics Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Performance Metrics</Text>
                    <View style={styles.metricsGrid}>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Total Tasks</Text>
                            <Text style={styles.metricValue}>{stats.totalTasks}</Text>
                        </View>

                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Overdue Tasks</Text>
                            <Text style={styles.metricValueDanger}>{stats.overdueTasks}</Text>
                        </View>

                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Completion Rate</Text>
                            <Text style={styles.metricValue}>{stats.completionRate.toFixed(1)}%</Text>
                        </View>

                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>On-Time Rate</Text>
                            <Text style={styles.metricValue}>{stats.onTimeRate.toFixed(1)}%</Text>
                        </View>

                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Engagement Score</Text>
                            <Text style={styles.metricValueLarge}>{stats.engagementScore.toFixed(1)}</Text>
                        </View>

                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Avg Completion Time</Text>
                            <Text style={styles.metricValue}>{stats.averageCompletionTime.toFixed(1)} days</Text>
                        </View>
                    </View>
                </View>

                {/* Task Distribution Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Task Status Distribution</Text>
                    <View style={styles.distributionSection}>
                        {Object.entries(stats.taskStatusDistribution).map(([status, count]) => {
                            const percentage = stats.totalTasks > 0 
                                ? ((count / stats.totalTasks) * 100).toFixed(1) 
                                : '0.0';
                            return (
                                <View key={status} style={styles.distributionRow}>
                                    <Text style={styles.distributionLabel}>{getStatusLabel(status)}</Text>
                                    <Text style={styles.distributionValue}>{count}</Text>
                                    <View style={{ flex: 1, marginLeft: 10, height: 16, backgroundColor: '#e5e7eb', borderRadius: 2 }}>
                                        <View style={[
                                            styles.distributionBar,
                                            { width: `${percentage}%` }
                                        ]} />
                                    </View>
                                    <Text style={{ fontSize: 10, color: '#6b7280', marginLeft: 5, width: 40, textAlign: 'right' }}>
                                        {percentage}%
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Performance Summary</Text>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>
                            Overall Performance: {getPerformanceRating(stats.engagementScore)}
                            {'\n\n'}
                            This report shows {userName ? `${userName}'s` : 'the member\'s'} performance metrics 
                            including task completion rates, engagement scores, and activity distribution. 
                            {'\n\n'}
                            Completed This Month: {stats.completedThisMonth} task{stats.completedThisMonth !== 1 ? 's' : ''}
                            {'\n'}
                            Tasks Pending: {(stats.taskStatusDistribution.TODO || 0) + (stats.taskStatusDistribution.IN_PROGRESS || 0)}
                            {'\n'}
                            Tasks Completed: {stats.taskStatusDistribution.DONE || 0}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>
                        Dashboard Monitoring General • Confidential Report
                        {'\n'}
                        Page 1 of 1
                    </Text>
                </View>
            </Page>
        </Document>
    );
};
