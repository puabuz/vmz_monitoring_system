import axios from "axios";

// --> Chart_Line component
// функция для формирования данных для графика (из Chart_Line)
// @param {number} times - unix time, 
// @param {number} values - значения для графика, 
// @return [{number}, {number}] - сформированный массив данных
export const conversionData = (times, values) => {
  // console.log(times.length);
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
    const response = await axios.post(`dashboard/graphs/${dash_Id}`, {
      start_dt: timeStart,
      end_dt: timeEnd,
    });
    return conversionData(response.data.timestamps, response.data.values);
  } catch (error) {
    console.log(error);
  }
};

//(-->ChartsAll component)
//Получаем все графики. 
//return [{},{}, ... {}]
export const getDashboardsList = async () => {
    const response = await axios.get("/dashboard/get")
    return response
}

//-->ChartsAll component
// Получаем все группы.
// return [{},{}, ... {}]
export const getGroupsList = async () => {
  const response = await axios.get("dashboard/groups/list");
  return response;
}

//-->ChartsAll component
// Удаляем график
// param graph ID
export const delGraph = async (graphId) => {
  await axios.delete(`/dashboard/graphs/del/${graphId}`)
}

//--> PopapAllNews component
// Получаеми все новости
// return [{},{}...{}]
export const getAllNews = async () => {
    const response = await axios.get("/user/news/unreaded");
    return response.data;
}

//--> PopapAllNews component
// Отправляем в архив прочитанную новость
// param newsId
export const userNewsRead = async (newsId) => {
  await axios.post(`/user/news/read/${newsId}`);
}

//--> ArchiveComponent 
// Получаем архив новостей

export const getArchiveNews = async () => {
  const response = await axios.get(`/user/news/archive`);
  return response.data;
}
//-->PopapUpdate_Dash
// Получаем массив параметров для добавления и редактирования графиков
//return Array []
export const getParametersList = async () => {
  const response = await axios.get("/user/parameters/get");
  return response.data
}

//-->DeviceComponentMetricsBox
//-->DeviceComponentMetricsBox_2
//получаем параметры пользователя
//return Array []
export const getUserParams = async () => {
  const userParametersAll = await axios.get(`/user/parameters/get`); //получаем параметры пользователя
  //сравниваем по math_visible
  const paramsFiltered = userParametersAll.data.filter(
    (p) => p.math_visible
  );
  const result = paramsFiltered.map((el) => {
    if (el.name) return el.name;
  });
  return result
}

//-->DeviceComponentMetricsBox
//-->DeviceComponentMetricsBox_2
//получаем все текущие метрики пользователя
// param - deviceId
//return [{}, {}, ... {}]
export const getCurrentMetrics = async (deviceId) => {
  const result = await axios.get(
    `/queries/last_over_time/${deviceId}`);
    return result
}

//-->DeviceComponentMetricsBox
//-->DeviceComponentMetricsBox_2
// получаем данные начала интервала

export const getMetricsStepStart = async(deviceId, step) => {
  const result = await axios.post(
    `/queries/first_by_interval/${deviceId}`,
    {
      interval: step,
    }
  );
  return result;
}

//--> PopapAdminAdd_News
//param "string"
//return 200 "Ok"
export const addNewNews = async (text) =>{
  const response = axios.post("/adm/news/add", { text });
  return response
}

//--> AdminParameters_Component
//param "string"
//return 200 "Ok"


