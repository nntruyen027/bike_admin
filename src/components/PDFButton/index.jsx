import React from 'react';
import { Document, Page, PDFDownloadLink, View, StyleSheet, PDFViewer, } from '@react-pdf/renderer';
import Home from '~/pages/Home';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create PDFReport component
const PDFReport = () => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        <Home />
      </View>
    </Page>
  </Document>
);

// Export PDFViewer component for previewing the PDF
export const PDFPreview = () => (
  <PDFViewer style={{
    width: '100%', height: '100vh', 
  }}>
    <PDFReport />
  </PDFViewer>
);

// Export PDFDownload component for downloading the PDF
export const PDFDownload = () => (
  <PDFDownloadLink document={<PDFReport />} fileName='report.pdf'>
    {({ loading, }) =>
      loading ? 'Loading document...' : 'Download now!'
    }
  </PDFDownloadLink>
);
