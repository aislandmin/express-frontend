export function getOrderType(type) {
  if (type === 1) {
    return "Same-day";
  }
  if (type === 2) {
    return "Flash";
  }
  if (type === 3) {
    return "Customized";
  }
}

export function getOrderStatus(status, orderStatus) {
  if (status === 2 || status === 3) {
    if (orderStatus === 0) {
      return "Picking up";
    } else if (orderStatus === 1) {
      return "Completed";
    } else if (orderStatus === 2) {
      return "Picking up";
    } else if (orderStatus === 3) {
      return "Picking up";
    } else if (orderStatus === 4) {
      return "In transit";
    } else if (orderStatus === 5) {
      return "In transit";
    } else if (orderStatus === 6) {
      return "In transit";
    } else if (orderStatus === 7) {
      return "In transit";
    } else if (orderStatus === 8) {
      return "Reviewed";
    } else if (orderStatus === 9) {
      return "Reviewed";
    }
  } else if (status === 4) {
    return "Cancelled";
  } else if (status === 1) {
    return "Waiting for driver";
  } else if (status === 0) {
    return "Unpaid";
  }
  return "";
}

export function urlToObj(url) {
  let obj = {};
  const arr1 = url.split("?");
  const arr2 = arr1[1].split("&");
  for (let i = 0; i < arr2.length; i++) {
    let res = arr2[i].split("=");
    obj[res[0]] = res[1];
  }
  return obj;
}

export function milisecondsToDataformat(miliseconds) {
  const dateObj = new Date(miliseconds);
  const year = dateObj.getFullYear() + "-";
  const month =
    (dateObj.getMonth() + 1 < 10
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1) + "-";
  const date =
    dateObj.getDate() < 10 ? "0" + dateObj.getDate() + " ": dateObj.getDate() + " ";
  const hour = dateObj.getHours() + ":";
  const minutes = dateObj.getMinutes();

  const resDateString = year + month + date + hour + minutes;
  return resDateString;
}
