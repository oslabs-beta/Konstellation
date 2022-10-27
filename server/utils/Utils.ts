
class Utils {
  
  static getTimestamp() {
    let ts = Date.now();
  
    let date_ob = new Date(ts);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
  
  // prints date & time in YYYY-MM-DD format
    return (year + "-" + month + "-" + date + " at " + hours + ":" + minutes + ":" + seconds);
  }

}
