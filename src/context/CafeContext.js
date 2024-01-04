import { createContext, useEffect, useState, useContext } from "react";
import { BASE_URL } from "../services/config";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export const CafeContext = createContext();

export const CafeProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(null);
  const [student, setStudent] = useState(null);
  const [cafeUser, setCafeUser] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [mealPeriods, setMeals] = useState({});
  const [selectedPeriodId, setSelectedPeriodId] = useState(null);

  let { authTokens } = useContext(AuthContext);

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

  const updateShowOption = () => {
    setShowOptions(!showOptions);
  };

  const updateError = ({ error }) => {
    setError(error);
  };

  const handleMealSelect = (period) => {
    setShowOptions(false);
    setSelectedPeriod(period);
    setSelectedPeriodId(period.id);
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

  const fetchMeal = async () => {
    setLoading(true); // Set loading to true
    try {
      const authToken = authTokens.access;
      const config = { headers: { Authorization: `Bearer ${authToken}` } };
      const response = await axios.get(`${BASE_URL}/cafe/meal/`, config);
      setError(null);
      setMeals(response.data);
    } catch (error) {
      alert(error.message);
      setError(error.message);
      setMeals(null);
    }
    setLoading(false); // Set loading to false
  };

  const fetchData = async () => {
    if (studentId) {
      setLoading(true);
      try {
        const authToken = authTokens.access;
        const config = { headers: { Authorization: `Bearer ${authToken}` } };
        const response = await axios.get(
          `${BASE_URL}/cafe/attendance/?student=${studentId}&meal_period=${selectedPeriodId}`,
          config
        );
        const student_data = response.data[0];
        setError(null);
        setCafeUser(student_data);
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

  const mark_as_eaten = async () => {
    setLoading(true);
    if (cafeUser) {
      try {
        const data = {
          has_eaten: true,
        };
        const authToken = authTokens.access;
        const config = { headers: { Authorization: `Bearer ${authToken}` } };
        const response = await axios.patch(
          `${BASE_URL}/cafe/attendance/${cafeUser.id}/`,
          data,
          config
        );
        if (response.data.message) {
          setError(response.data.message);
        }
        setError(null);
      } catch (error) {
        setResponseMessage(null);
        setError(error);
      }
    }
    setLoading(false);
    setScanned(false);
    setStudentId(null);
  };

  let contaxtData = {
    student,
    error,
    loading,
    scanned,
    selectedPeriod,
    mealPeriods,
    showOptions,
    selectedPeriodId,
    cafeUser,
    handleBarCodeScanned,
    updateScanned,
    updateLoading,
    updateError,
    handleMealSelect,
    fetchMeal,
    mark_as_eaten,
    updateShowOption,
  };

  useEffect(() => {
    fetchData();
  }, [studentId, selectedPeriodId]);

  return (
    <CafeContext.Provider value={contaxtData}>{children}</CafeContext.Provider>
  );
};
