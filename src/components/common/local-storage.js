export function setSessionUserInfo(username) {
  const curTime = new Date().getTime();

  localStorage.setItem(
    "name",
    JSON.stringify({
      name: username,
      time: curTime,
    })
  );
}

export function getSessionUserIno() {
  const data = localStorage.getItem("name");
  if (data === null) {
    return null;
  }

  const dataObj = JSON.parse(data);
  const expirePeriod = 500 * 1000; //1分钟

  if (new Date().getTime() - dataObj.time > expirePeriod) {
    console.log("expires, local storage remove name.....");
    localStorage.removeItem("name");
    return null;
  } else {
    console.log("get local storage username = ", dataObj.name);
    return dataObj.name;
  }
}

export function removeSessionUserIno() {
  localStorage.removeItem("name");
  console.log("remove local storage username......");
}
