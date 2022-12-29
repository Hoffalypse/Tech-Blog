//makes sure time is correctly formated 
module.exports = {
    format_time: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear()}`;
    },
  };