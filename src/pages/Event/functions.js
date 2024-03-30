function convertIsoToDdMmYyyy(isoTime) {
  console.log(isoTime)
  const dateTime = new Date(isoTime);

  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = dateTime.getDate().toString().padStart(2, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
  const year = dateTime.getFullYear();

  // Lấy giờ, phút và giây từ đối tượng Date
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');

  // Trả về ngày giờ trong định dạng "dd/mm/yyyy hh:mm:ss"
  console.log(`${day}/${month}/${year}`)
  return `${day}/${month}/${year}`;
}

function compareTime(startTime, endTime) {
  var currentTime = new Date();
  // Chuyển đổi thời gian truyền vào thành đối tượng Date
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

export { convertIsoToDdMmYyyy, compareTime, };