<template>
  <div class="container">
    <h2>All users</h2>

    <div id="demo">
      <form id="search">
        Search <input name="query" v-model="searchQuery" placeholder="any part of any field">
        <span class="page-select">Page <input type="number" v-model="pagination.current_page" min="1" max="{{ pagination.total_pages }}"></input> of {{ pagination.total_pages }}</span>
      </form>
      <grid-template
      :data="users"
      :columns="gridColumns"
      :filter-key="searchQuery">
      </grid-template>
    </div>

  </div>
  <pre>{{ $data | json }}</pre>
</template>

<script>
import auth from '../auth'
import users from '../users'
import GridTemplate from './GridTemplate'
export default {
  components: {
    GridTemplate
  },
  data () {
    return {
      searchQuery: '',
      gridColumns: ['id', 'name', 'email', 'created_at', 'updated_at'],
      users: [],
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0
      }
    }
  },
  route: {
    canActivate (transition) {
      if (auth.user.authenticated) {
        transition.next()
      } else {
        transition.abort()
      }
    },
    activate ({ next }) {
      users.all(this, auth.getTokenQueryParam())
      next()
    }
  },
  watch: {
    'pagination.current_page': function (val) {
      users.all(this, auth.getTokenQueryParam(), val)
    }
  }
}
</script>
.
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-select {
  margin-left: 100px;
}
</style>
