import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userStatisticsData from "../mock/users_statistic.json";
import ClicksChart from "../components/ClicksChart/ClicksChart";
import PageViewsChart from "../components/PageViewsChart/PageViewsChart";
import MyButton from "../components/MyButton/MyButton";
import st from "../pages/Chart.module.scss";

const Chart = () => {
  const [pageClicks, setPageClicks] = useState(false);
  const [userPageViews, setUserPageViews] = useState(false);
  const history = useHistory();
  const userId = history.location.state;

  useEffect(() => {
    !userId && history.goBack();
  }, [history, userId]);

  const filteredUsers = userStatisticsData.filter(
    (user) => user.user_id === userId
  );

  const usersDate = filteredUsers.map(({ date }) => date);
  const userClick = filteredUsers.map(({ clicks }) => clicks);
  const pageViews = filteredUsers.map(({ page_views }) => page_views);

  const getVisibleClicks = () => {
    setPageClicks(true);
    setUserPageViews(false);
  };

  const getVisiblePageViews = () => {
    setUserPageViews(true);
    setPageClicks(false);
  };

  const [startDate, setStartDate] = useState(new Date("10/01/2019"));
  const [endDate, setEndDate] = useState(new Date("10/31/2019"));

  const normalizeStartDate = startDate
    .toLocaleString()
    .slice(0, 10)
    .split(".")
    .reverse()
    .join("-")
    .split(" ");

  console.log(normalizeStartDate);

  const normalizeEndDate = endDate
    .toLocaleString()
    .slice(0, 10)
    .split(".")
    .reverse()
    .join("-")
    .split(" ");

  const [sliceDate, setSliceDate] = useState([]);

  const [normDate, setNormDate] = useState([
    normalizeStartDate,
    normalizeEndDate,
  ]);

  const sortedDate = usersDate.filter(
    (users) =>
      users <= normalizeEndDate.join() && users >= normalizeStartDate.join()
  );

  useEffect(() => {
    setNormDate([normDate]); // eslint-disable-next-line
  }, [sliceDate]);

  function handleSliceData(date) {
    setSliceDate(
      date
        .toLocaleString()
        .slice(0, 10)
        .split(".")
        .reverse()
        .join("-")
        .split(" ")
    );
  }

  const handleStartDate = (date) => {
    setStartDate(date);
    handleSliceData(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    handleSliceData(date);
  };

  return (
    <div className={st.wrapper}>
      <h2 className={st.title}>User Statistics</h2>
      <div className={st.commonWrapper}>
        <div className={st.buttonwrapper}>
          <MyButton
            value="Clicks"
            onClick={getVisibleClicks}
            className={st.button}
          />
          <MyButton
            value="Views"
            onClick={getVisiblePageViews}
            className={st.button}
          />
        </div>
        <div className={st.calendar}>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleStartDate(date)}
            selectsStart
            startDate={startDate}
            placeholderText="Please, enter start date"
            className={st.inputfield}
            handleSliceData
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleEndDate(date)}
            selectsEnd
            endDate={endDate}
            placeholderText="Please, enter end date"
            className={st.inputfield}
            handleSliceData
          />
        </div>
      </div>
      {pageClicks && <ClicksChart date={sortedDate} userClick={userClick} />}
      {userPageViews && (
        <PageViewsChart date={sortedDate} pageViews={pageViews} />
      )}
    </div>
  );
};

export default Chart;
