import md5 from 'md5';
export default {

hash(hashString){
return md5(`${hashString}`);
}
  
  }