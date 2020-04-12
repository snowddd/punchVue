

export default {
 dateFormat(date) {
        let dm = date.slice(4,7);
        let dd = date.slice(8,10);
        let dy = date.slice(11,15);
        let dt = date.slice(16,24);
        let space = ' ';
return dy+'/'+this.monthFormat(dm)+'/'+dd+space+dt;
}
,
monthFormat(dm){
   switch(dm){
      case 'Jan':
          return '01';
          case 'Feb':
          return '02';
          case 'Mar':
          return '03';
          case 'Apr':
          return '04';
          case 'May':
          return '05';
          case 'Jun':
          return '06';
          case 'Jul':
          return '07';
          case 'Aug':
          return '08';
          case 'Sep':
          return '09';
          case 'Oct':
          return '10';
          case 'Nov':
          return '11';
          case 'Dec':
          return '12';
      }
}



 }
