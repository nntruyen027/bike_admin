function convertIsoToDdMmYyyy(isoTime) {
  const dateTime = new Date(isoTime);

  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear();

  // // Lấy giờ, phút và giây từ đối tượng Date
  // const hours = dateTime.getHours().toString().padStart(2, '0');
  // const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  // const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
}

function compareTime(startTime, endTime) {
  var currentTime = new Date();
  var startDate = new Date(startTime);
  var endDate = new Date(endTime);

  if (currentTime < startDate) {
    return -1; // Chưa bắt đầu
  } else if (currentTime >= startDate && currentTime <= endDate) {
    return 0; // Đang diễn ra
  } else {
    return 1; // Đã kết thúc
  }
}

function convertDatetimeToLocalString(datetimeValue) {
  const datetime = new Date(datetimeValue);

  const year = datetime.getFullYear();
  const month = ('0' + (datetime.getMonth() + 1)).slice(-2);
  const day = ('0' + datetime.getDate()).slice(-2);
  const hours = ('0' + datetime.getHours()).slice(-2);
  const minutes = ('0' + datetime.getMinutes()).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const convertToPostgresTimestamp = (datetime) => {
  // Chuyển đổi ngày giờ từ datetime-local thành định dạng ISO 8601
  const parts = datetime.split('T');
  const datePart = parts[0];
  const timePart = parts[1];
  return `${datePart} ${timePart}:00`;
};

function formatDateTimePostgresToReadable(postgresDateTime) {
  const dateTime = new Date(postgresDateTime);
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear().toString();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export {
  convertIsoToDdMmYyyy, compareTime, convertDatetimeToLocalString, convertToPostgresTimestamp, formatDateTimePostgresToReadable,
};