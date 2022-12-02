class Utils {
  static getTimestamp() {
    const ts = Date.now();

    const date_ob = new Date(ts);
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    const date = date_ob.getDate();
    const month = date_ob.getMonth() + 1;
    const year = date_ob.getFullYear();

    // prints date & time in YYYY-MM-DD format
    return (
      year +
      '-' +
      month +
      '-' +
      date +
      ' at ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds
    );
  }
}

export default Utils;
