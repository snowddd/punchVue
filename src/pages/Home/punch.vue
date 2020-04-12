<template>
  <div class="wrapper">
    <div class="loading" v-if="!dataStatus"><img src="../../assets/loading.svg"></div>
<div v-if="dataStatus">
<p style="text-align:center; font-size: 20px;"> Recent 50 punch records</p>
<table border=4 align=center width=100% bgcolor=white cellspacing=5 cellpadding=6 v-if="punchjsoncheck">
    <tr>
        <td align=center>PunchStatus</td>
        <td align=center>PunchTime</td>
    </tr>
    <tr v-for=" (pun,idx) in punchjson" :key="idx">
        <td align=center>{{punchType(pun.CheckStatus)}}</td>
        <td align=center>{{dateFormat(new Date(pun.CheckTime))}}</td>
    </tr>
</table>

<table border=4 align=center width=100% bgcolor=white cellspacing=5 cellpadding=6 v-if="!punchjsoncheck">
    <tr>
        <td align=center>PunchStatus</td>
        <td align=center>PunchTime</td>
    </tr>
</table>

<br>
<div style="text-align:center;">
    <br>
    <button @click="punch">Punch</button>
    <br>
    <br>
    <button @click="goProfile">Back</button>
</div>
  </div>
 </div> 
</template>

<script>
import service from "../../services/api";
import router from "../../router";
import dateFormat from '../../services/dateFormat';
export default {
  name: "Punch",
  props: {
  },
  data() {
    return {
  punchjson :[],
  data:'' ,
  punchjsoncheck: true,
  dataStatus:false
    };
  },
  beforeMount() {
    this.punchRecords();
    
  },
  methods: {
    async punchRecords() {
      let data = { "id": localStorage.getItem('id') };
      service
        .sendRequest("punchRecords", data)
        .then(res => {
          console.log(res)
        if (res.data.returnCode === '0000') {
          this.punchjson = res.data.return;
          this.dataStatus = true;
        } else if (res.data.returnCode === '0001') {
          this.punchjsoncheck === false;
          this.dataStatus = true;
        }
        else {
          alert('Systems error');
          this.dataStatus = true;
        }
      }, (err) => {
        console.log(err);
        this.dataStatus = true;
        alert('Systems error');
      });
    },
      async punch() {
      let data = { "id": localStorage.getItem('id') };
      service
        .sendRequest("punch", data)
        .then(res => {
        if (res.data.returnCode === '0000') {
          // this.punchjson = res.return;
          this.punchRecords();
          // alert('Punch success');
        }
        else if(res.data.returnCode === '0002'){
          alert('Check your this day Punch records');
        }else {
          alert('fail to Punch');
        }
      }, (err) => {
        console.log(err);
        alert('Systems error');
      });
    }
    ,
  goProfile() {
    router.push('member');

  },
    punchType(punch) {
    if (punch == 1) {
      return 'PunchIn';
    } else if (punch == 2) {
      return 'PunchOut';
    }
  },
dateFormat(date){
if(date){
    date = date + '';
return dateFormat.dateFormat(date);
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