import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        borderBottom: 1,
        borderBottomColor: '#eeeeee',
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
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#f6f8fa',
        padding: 5,
        marginBottom: 10,
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        minHeight: 25,
        alignItems: 'center',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    tableColHeader: {
        width: '25%',
        padding: 5,
        fontSize: 10,
        fontWeight: 'bold',
    },
    tableCol: {
        width: '25%',
        padding: 5,
        fontSize: 9,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#999999',
        borderTop: 1,
        borderTopColor: '#eeeeee',
        paddingTop: 10,
    },
});

interface ReportPDFProps {
    data: {
        sprints: any[];
        tasks: any[];
        risks: any[];
        kpis: any[];
        users: any[];
    };
}

export const ReportPDF = ({ data }: ReportPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Project Dashboard Report</Text>
                <Text style={styles.subtitle}>Generated on {new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Overview Summary</Text>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Total Sprints: {data.sprints.length}</Text>
                    <Text style={styles.tableCol}>Total Tasks: {data.tasks.length}</Text>
                    <Text style={styles.tableCol}>Total Risks: {data.risks.length}</Text>
                    <Text style={styles.tableCol}>Total KPIs: {data.kpis.length}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sprints</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableColHeader, { width: '40%' }]}>Name</Text>
                    <Text style={[styles.tableColHeader, { width: '30%' }]}>Status</Text>
                    <Text style={[styles.tableColHeader, { width: '30%' }]}>Timeline</Text>
                </View>
                {data.sprints.map((sprint, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: '40%' }]}>{sprint.name}</Text>
                        <Text style={[styles.tableCol, { width: '30%' }]}>{sprint.status}</Text>
                        <Text style={[styles.tableCol, { width: '30%' }]}>{sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : '-'}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tasks</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableColHeader, { width: '40%' }]}>Title</Text>
                    <Text style={[styles.tableColHeader, { width: '30%' }]}>Status</Text>
                    <Text style={[styles.tableColHeader, { width: '30%' }]}>Due Date</Text>
                </View>
                {data.tasks.slice(0, 20).map((task, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: '40%' }]}>{task.title}</Text>
                        <Text style={[styles.tableCol, { width: '30%' }]}>{task.status}</Text>
                        <Text style={[styles.tableCol, { width: '30%' }]}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Risks</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableColHeader, { width: '50%' }]}>Title</Text>
                    <Text style={[styles.tableColHeader, { width: '25%' }]}>Severity</Text>
                    <Text style={[styles.tableColHeader, { width: '25%' }]}>Occurrence</Text>
                </View>
                {data.risks.map((risk, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: '50%' }]}>{risk.title || 'Untitled'}</Text>
                        <Text style={[styles.tableCol, { width: '25%' }]}>{risk.severity || 0}</Text>
                        <Text style={[styles.tableCol, { width: '25%' }]}>{risk.occurrence || 0}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key KPIs</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableColHeader, { width: '50%' }]}>Name</Text>
                    <Text style={[styles.tableColHeader, { width: '50%' }]}>Sampling Rate</Text>
                </View>
                {data.kpis.map((kpi, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: '50%' }]}>{kpi.name}</Text>
                        <Text style={[styles.tableCol, { width: '50%' }]}>{kpi.samplingRate || '-'}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                `Page ${pageNumber} of ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);
