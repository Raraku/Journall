import "./styles.css";
import DailyRecord from "./Pages/DailyRecord";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import styled from "styled-components";
import Layout from "./Components/Layout";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("America/Los_Angeles");

dayjs.extend(localizedFormat);

export default function App() {
  return (
    <Layout>
      <DailyRecord />
    </Layout>
  );
}
