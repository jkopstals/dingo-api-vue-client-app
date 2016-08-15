<template>

  <div class="container">
    <div class="alert" v-show="message">{{ message }}</div>
    <div class="alert alert-error" v-show="error">{{ error }}</div>
    <h2>Import users from Excel</h2>
    <div class="container well">
    Example files:
    <ul>
      <li><a href="static/import_example.csv">import_example.csv</a></li>
      <li><a href="static/import_example.xlsx">import_example.xlsx</a></li>
    </div>
    Choose excel file: <input type="file" name="files[]" v-on:change="onFileChange">
    <br />
    <br />
    <button class="btn btn-lg btn-primary btn-block" v-bind:class="{'disabled' : !files.length}" @click="upload">Upload</button>
  </div>

  <div class="container" v-show="response.data.progress.length">
    <h2>Import result</h2>
    <div class="well">Import progress:
    <ul v-show="response.data.progress">
      <li v-for="step in response.data.progress">{{ step }}</li>
    </ul>
    <import-table :data="response.data.rows" :columns="['name', 'email', 'password']"></import-table>
    </div>
  </div>
  <!--<pre>{{ $data | json }}</pre>-->
</template>

<script>
import auth from '../auth'
import ImportTable from './ImportTable'
export default {
  components: {
    ImportTable
  },
  data () {
    return {
      files: {},
      error: '',
      message: '',
      response: {data: {progress: {}, rows: {errors: {}}}}
    }
  }, methods: {
    onFileChange: function (e) {
      this.files = e.target.files || e.dataTransfer.files
    },
    upload: function () {
      this.error = ''
      this.message = ''
      if (this.files.length > 0) {
        // console.log(this.files)
        var file = this.files[0]
        this.$http.post('users/upload?' + auth.getTokenQueryParam(), file).then((response) => {
          if (response.json()) {
            this.response = response.json()
          } else {
            this.error = 'Unknown error'
          }
        }, (response) => {
          // console.log(response)
          this.error = response.status
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
