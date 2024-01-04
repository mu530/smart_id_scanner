import { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../services/config";
import axios from "axios";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);
  const [student, setStudent] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  axios.defaults.timeout = 3000;
  axios.defaults.timeoutErrorMessage = "timeout";

  const updateScanned = ({ state }) => {
    setScanned(state);
    if (state == false) {
      setStudent(null);
    }
  };

  const updateLoading = ({ state }) => {
    setLoading(state);
  };

  const updateError = ({ error }) => {
    setError(error);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const parsedData = JSON.parse(data);
      setStudentId(parsedData.student_id);
    } catch (error) {
      setError(
        `ይህ የጎንደር ዩኒቨርሲቲ QR ኮድ አይደለም!! \nThis QR code does not belong to UoG!!`
      );
      alert(
        `ይህ የጎንደር ዩኒቨርሲቲ QR ኮድ አይደለም!! \nThis QR code does not belong to UoG!!`
      );
      setStudentId(null);
      setStudent(null);
    }
  };

  const fetchData = async () => {
    if (studentId) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/students/${studentId}/`);
        const student_data = response.data;
        setError(null);
        setStudent(student_data);
      } catch (error) {
        setStudentId(null);
        setStudent(null);

        if (error.response && error.response.status === 404) {
          setError(`የተማሪ መረጃ አልተገኘም።  \nStudent not found.`);
          alert(`የተማሪ መረጃ አልተገኘም።  \nStudent not found.`);
        } else if (axios.isAxiosError(error) && error.message === "timeout") {
          setError(
            `እባክዎ የበይነመረብ ግንኙነትዎን ያረጋግጡ እና እንደገና ይሞክሩ \nPlease check your internet connection and try again`
          );
          alert(
            `እባክዎ የበይነመረብ ግንኙነትዎን ያረጋግጡ እና እንደገና ይሞክሩ \nPlease check your internet connection and try again`
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  let contaxtData = {
    student,
    error,
    loading,
    scanned,
    handleBarCodeScanned,
    updateScanned,
    updateLoading,
    updateError,
  };

  useEffect(() => {
    setStudent(null);
    fetchData();
  }, [scanned]);

  return (
    <StudentContext.Provider value={contaxtData}>
      {children}
    </StudentContext.Provider>
  );
};
