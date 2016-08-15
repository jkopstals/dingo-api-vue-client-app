<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th v-for="key in columns">
          {{key | capitalize}}
        </th>
        <th>Errors</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="
        entry in data">
        <td :class="{problem: entry.errors[key], success: entry.success}" v-for="key in columns">
          {{entry.user[key]}}
        </td>
        <td>
          <div v-show="entry.errors" v-for="(e_k, e_v) in entry.errors">
          {{e_k}} -> {{e_v}}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'import-table',
  props: {
    data: Array,
    columns: Array
  },
  data: function () {

  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border: 2px solid #AAA;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #AAA;
  color: rgba(255,255,255,0.66);
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.activated {
  color: #fff;
}

th.activated .arrow {
  opacity: 1;
}
.problem {
 background-color: #E00;
}
.success {
 background-color: #0A0;
}
</style>
