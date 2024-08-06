const apiResponce = (success, statusCode, message, data) => {
  return {
    success,
    statusCode,
    message,
    data,
  };
};

export default apiResponce;
