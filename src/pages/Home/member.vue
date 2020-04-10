<template>

  <div class="wrapper">
    <div class="loading" v-if="!dataStatus"><img src="../../assets/loading.svg"></div>
    <div v-if="dataStatus">
    <p style="text-align: center; font-size:25px">QRSTORE Attendance system</p>
    <p style="text-align: center; font-size:25px">{{name}} Profile</p>
    <table border="4" align="center" width="50%" bgcolor="white" cellspacing="5" cellpadding="6">
      <tr>
        <td>EmployeeId</td>
        <td>{{id}}</td>
      </tr>

      <tr>
        <td>Name</td>
        <td>{{name}}</td>
      </tr>

      <tr>
        <td>Sex</td>
        <td>{{sex==='1' ? 'Male' : 'Female' }}</td>
      </tr>

      <tr>
        <td>PersonId</td>
        <td>{{personId}}</td>
      </tr>

      <tr>
        <td>BirthDate</td>
        <td>{{birthDate}}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{{phone}}</td>
      </tr>
      <tr>
        <td>Position</td>
        <td>{{position}}</td>
      </tr>
      <tr>
        <td>Department</td>
        <td>{{department}}</td>
      </tr>
      <tr style="text-align: center;">
        <td>
          <button @click="goPunch">punch</button>
        </td>
        <td>
          <button @click="goLeave">leave</button>
        </td>
      </tr>
      <tr style="text-align: center;">
        <td colspan="2">
          <button @click="logout">logout</button>
        </td>
      </tr>
    </table>
  </div>
  </div>
</template>

<script>
import service from "../../services/api";
import router from "../../router";
export default {
  name: "Member",
  props: {
  },
  data() {
    return {
      id: "",
      name: "",
      sex: "",
      personId: "",
      birthDate: "",
      phone: "",
      position: "",
      department: "",
      employee: [],
      dataStatus:false,
      Stroge:[]
    };
  },
  beforeMount() {
    if(!localStorage.getItem('member')){
    this.sendRequest();
    }else{
    this.Stroge = JSON.parse(localStorage.getItem('member'))
            this.id = this.Stroge.id;
            this.name = this.Stroge.name;
            this.sex = this.Stroge.sex;
            this.personId = this.Stroge.personId;
            this.birthDate = this.Stroge.birthDate;
            this.phone = this.Stroge.phone;
            this.position = this.Stroge.position;
            this.department = this.Stroge.department;
            this.dataStatus = true;
    }

  },
  methods: {
    async sendRequest() {
      let data = { id: localStorage.getItem("id") };
      service
        .sendRequest("profiLe", data)
        .then(res => {
          console.log(res);
          if (res.data.returnCode === "0000") {
            this.employee = res.data.return[0];
            this.id = this.employee.id;
            this.name = this.employee.name;
            this.sex = this.employee.sex;
            this.personId = this.employee.personId;
            this.birthDate = this.employee.birthDate;
            this.phone = this.employee.phone;
            this.position = this.employee.position;
            this.department = this.employee.department;
            localStorage.setItem('member',JSON.stringify(this.employee))
            // this.Stroge = JSON.parse(localStorage.getItem('member'))
            // console.log(this.Stroge)
            this.dataStatus = true;
          } else {
            alert("Get user profile fail");
            this.dataStatus = true;

          }
        })
        .catch(err => {
        console.log(err);
        this.dataStatus = true;
        });
    },
    goLeave() {
      router.push("leave");
    },
    goPunch() {
      router.push("punch");
    },
    logout() {
      localStorage.removeItem("id");
      localStorage.removeItem("member")
      // localStorage.removeItem("leave")
      router.push("login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%;
  max-width: 750px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
</style>