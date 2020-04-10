<template>
  <div class="wrapper">
<div class="loading" v-if="!dataStatus"><img src="../../assets/loading.svg"></div>

<div v-if="dataStatus">
<p style="text-align:center; font-size: 20px;"> Recent 30 leave records</p>
<table border=4 align=center width=40% bgcolor=white cellspacing=5 cellpadding=6 v-if="leavejsoncheck">
  <tr>
    <td align=center>Vaction</td>
    <td align=center>VacationDate</td>
  </tr>
  <tr v-for=" (lea,idx) in leavejson" :key="idx">
    <td align=center>{{lea.Vacation}}</td>
    <td>{{lea.VacationDate}}</td>
  </tr>
</table>

<table border=4 align=center width=40% bgcolor=white cellspacing=5 cellpadding=6 v-if="!leavejsoncheck">
  <tr>
    <td align=center>Vaction</td>
    <td align=center>VacationDate</td>
  </tr>
</table>

<br>
<form align=center>
  <div>
    <label for="party">Choose your leave date:</label>
    <input type="date" id="party" name="party" min="" max="" v-model="leaveDate">
  </div>
  <div>
    <select class="leave" v-model="leaveType" name="leave">
      <option value=0>Leave for Statutory Reasons</option>
      <option value=1>Personal Leave</option>
      <option value=2>Sick Leave</option>
      <option value=3>Marital Leave</option>
      <option value=4>Annual Leave</option>
    </select>
  </div>
  <div>
    <br>
    <button @click="leavea">submit</button>
    <br>
    <br>
  </div>
</form>
<div align=center>
<button @click="goProfile">Back</button>
</div>
  </div>
  </div>
</template>

<script>
import service from "../../services/api";
import router from "../../router";
export default {
  name: "Leave",
  props: {
  },
  data() {
    return {
  min: new Date().getUTCFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
  max: (new Date().getUTCFullYear() + 1) + '-' + '12' + '-' + '31',
  leaveDate: '',
  leaveType:'',
  leavejson:'',
  leavejsoncheck: true,
  leave:[],
  dataStatus:false,
  // apiStatus:false,
  Stroge:[]
    };
  },
  beforeMount() {
    // if(!localStorage.getItem('leave') && this.apiStatus){
    this.leaveRecords();
    // }
    // else{
    //  this.Stroge = JSON.parse(localStorage.getItem('leave'));
    //  this.leavejson = this.Stroge;
    //  this.dataStatus = true;
    // }
  },
  methods: {
    async leaveRecords() {
      let data = { "id": localStorage.getItem('id') };
      service
        .sendRequest("leaveRecords", data)
        .then(res => {
            console.log(res)
        if (res.data.returnCode === '0000') {
          this.leavejson = res.data.return;
          // localStorage.setItem('leave',JSON.stringify(res.data.return))
          this.dataStatus = true;
        }
        else if (res.data.returnCode === '0001') {
          this.leavejsoncheck === false;
          this.dataStatus = true;
        }
        else {
          alert('Systems error');
          this.dataStatus = true;
        }
      }, (err) => {
        console.log(err);
        alert('Systems error');
        this.dataStatus = true;
      });
    },
      async leavea() {
      if(this.leaveType && this.leaveDate ){
      let data = { "id": localStorage.getItem('id'), "Vacation": this.leaveType, "VacationDate": this.leaveDate };
    //   if (this.checkDateMin(this.leaveDate)) {
        
      service
        .sendRequest("leave", data)
        .then(res => {
            console.log(res)
          if (res.data.returnCode === '0000') {
            // this.apiStatus = true;
            this.leaveRecords();
            alert('leave Success');
          } else {
            alert('leave fail , Check your date choose');
          }
        }, (err) => {
          console.log(err);
          alert('Systems error');
        });
    //  }
    //  else {
    //   alert('leave fail , Check your date choose');
    // }
     }else if(!this.leaveType || !this.leaveDate){
     alert('check your leave choose , cant be null')
  }

    }
    ,
  goProfile() {
    router.push('member');

  },
  checkDateMin(leaveDate) {
    //year leaveDate>nowDate
    if (parseInt(leaveDate.slice(0, 4)) > parseInt(this.nowDate.slice(0, 4))) {
      return true;
    }
    //same year, month leaveDate>nowDate
    else if (parseInt(leaveDate.slice(0, 4)) === parseInt(this.nowDate.slice(0, 4)) && parseInt(leaveDate.slice(5, 7)) > parseInt(this.nowDate.slice(5, 7))) {
      return true;
    }
    //same year, same month, date leaveDate>nowDate
    else if (parseInt(leaveDate.slice(0, 4)) === parseInt(this.nowDate.slice(0, 4)) && parseInt(leaveDate.slice(5, 7)) === parseInt(this.nowDate.slice(5, 7)) && parseInt(leaveDate.slice(8, 10)) >= parseInt(this.nowDate.slice(7, 10))) {
      return true;
    }
    else {
      return false;
    }
  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%;
  max-width: 600px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
</style>