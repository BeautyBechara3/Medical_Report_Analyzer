import React from 'react';
import './Visualize.scss';
import PatientInfo from '../PatientInfo/PatientInfo.jsx';
import ReportDetails from '../ReportDetails/ReportDetails.jsx';
import Analysis from '../Analysis/Analysis.jsx';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo.jsx';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Visualize = () => {

    const [reportData, setReportData] = useState(null);
    const location = useLocation();
    const Data = location.state;

    useEffect(() => {
        let parsedData;
        if (Data) {
            parsedData = typeof Data === 'string' ? JSON.parse(Data) : Data;
            console.log(parsedData);
            setReportData(parsedData || null);
        }
    }, [Data]);

    if (!reportData) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

  return (
    <div className="app-container">
      <PatientInfo patientInfo={reportData.patient_info} />
      <ReportDetails reportDetails={reportData.report_details} />
      <Analysis analysis={reportData.analysis} />
      <AdditionalInfo additionalInfo={reportData.additional_info} />
    </div>
  );
};

export default Visualize;
