
// const formDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toDateString();
//   }

// export default formDate;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}--${month}--${day}`;
};

export default formatDate;
