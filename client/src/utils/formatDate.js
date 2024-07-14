export const formatDate = (receivedDate) => {
    const dateItems = receivedDate.split('-');
    const year = dateItems[0];
    const month = dateItems[1];
    const date = dateItems[2].slice(0,2);
    return `${date}.${month}.${year} `;
  };