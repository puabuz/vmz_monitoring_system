import axios from "axios";

// --> Chart_Line component
// функция для формирования данных для графика (из Chart_Line)
// @param {number} times - unix time, 
// @param {number} values - значения для графика, 
// @return [{number}, {number}] - сформированный массив данных
export const conversionData = (times, values) => {
  // console.log(times);
  let result = [];
  let getTime = times;
  let getData = values;
  for (let i = 0; i < times.length; i++) {
    let item = [];
    item.push(getTime[i] + 1000 * 60 * 180);
    item.push(getData[i]);
    result.push(item);
  }
  return result;
};
// --> Chart_Line component
// Загрузка данных для графика.
// @param {number} dash_Id - id графика, 
// @param {number} timeStart -начало интервала, 
// @param {number} timeEnd конец интервала
// @return [{number}, {number}]
export const getMetricsForDash = async (dash_Id, timeStart, timeEnd) => {
  try {
    const response = await axios.post(`dashboards/dash/${dash_Id}`, {
      start_dt: timeStart,
      end_dt: timeEnd,
    });
    return conversionData(response.data.timestamps, response.data.values);
  } catch (error) {
    console.log(error.response.data.detail);
  }
};

//(-->ChartsAll component)
//Получаем все графики. 
//return [{},{}, ... {}]
export const getDashboardsList = async () => {
    const response = await axios.get("/dashboards/list")
    return response
}

//-->ChartsAll component
//Получаем все группы.
//return [{},{}, ... {}]
export const getGroupsList = async () => {
  const response = await axios.get("dashboards/list_groups");
  return response;
}


