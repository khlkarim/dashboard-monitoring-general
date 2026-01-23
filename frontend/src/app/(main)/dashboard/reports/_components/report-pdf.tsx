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
                {data.sprints.slice(0, 10).map((sprint, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: '40%' }]}>{sprint.name}</Text>
                        <Text style={[styles.tableCol, { width: '30%' }]}>{sprint.status}</Text>
                        <Text style={[styles.tableCol, { width: '30%' }]}>{new Date(sprint.startDate).toLocaleDateString()}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key KPIs</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableColHeader, { width: '50%' }]}>Title</Text>
                    <Text style={[styles.tableColHeader, { width: '25%' }]}>Target</Text>
                    <Text style={[styles.tableColHeader, { width: '25%' }]}>Status</Text>
                </View>
                {data.kpis.slice(0, 5).map((kpi, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: '50%' }]}>{kpi.title}</Text>
                        <Text style={[styles.tableCol, { width: '25%' }]}>{kpi.targetValue}</Text>
                        <Text style={[styles.tableCol, { width: '25%' }]}>{kpi.status}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
                `Page ${pageNumber} of ${totalPages}`
            )} fixed />
        </Page>
    </Document>
);
