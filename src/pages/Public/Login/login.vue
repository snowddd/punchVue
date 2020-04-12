<template>
  <div class="wrapper">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="account" label-for="input-1">
        <b-form-input id="input-1" v-model="form.account" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="password" label-for="input-2">
        <b-form-input id="input-2" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button type="reset" variant="danger" style="margin-left:20px">Reset</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>-->
  </div>
</template>

<script>
import md5Hash from "../../../services/md5Hash";
import service from "../../../services/api";
import router from "../../../router/index";
export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    async sendRequest() {
      let data = {
        account: this.form.account,
        password: md5Hash.hash(this.form.password)
      };
      service
        .sendRequest("login", data)
        .then(res => {
          // console.log(res);
          if (res.data.returnCode === "0000") {
            localStorage.setItem("id", `${res.data.id}`);
            router.push("member");
          } else {
            alert("Login fail");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.sendRequest();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.account = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%;
  max-width: 450px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
</style>