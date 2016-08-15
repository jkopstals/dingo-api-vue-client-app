<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 margin-tb">
        <div class="pull-left">
          <h2>All users</h2>
        </div>
        <div class="pull-right">
          <button type="button" class="btn btn-success" @click="showCreateForm">
          Create Item
          </button>
        </div>
      </div>
    </div>

    <!-- Item Listing -->

    <table class="table table-bordered">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Created at</th>
        <th width="200px">Action</th>
      </tr>

      <tr v-for="item in users">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.created_at }}</td>
        <td>

          <button class="btn btn-primary"
          @click.prevent="editItem(item)">Edit</button>

          <button class="btn btn-danger"
          @click.prevent="deleteItem(item)">Delete</button>

        </td>
      </tr>
    </table>
    <!-- Pagination -->

    <nav>
      <ul class="pagination">
        <li v-if="pagination.current_page > 1">
          <a href="#" aria-label="Previous"
          @click.prevent="changePage(pagination.current_page - 1)">
            <span aria-hidden="true">«</span>
          </a>
        </li>

        <li v-for="page in pagesNumber"
          :class="{active: page == pagination.current_page}">
          <a href="#"
          @click.prevent="changePage(page)">{{ page }}</a>
        </li>

        <li v-if="pagination.current_page < pagination.total_pages">
          <a href="#" aria-label="Next"
          @click.prevent="changePage(pagination.current_page + 1)">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Create Item Modal -->
    <div class="modal-mask" v-show="showModal === 'create-item'" transition="modal" id="create-item">
    <div class="modal-wrapper">
      <div class="modal-container">
          <div class="modal-header">
            <button type="button" class="close" @click="closeModal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Create Item</h4>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="storeItem">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" class="form-control" v-model="newItem.name" />
                <span v-if="formErrors['name']" class="error text-danger">{{ formErrors['name'] }}</span>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" name="email" class="form-control" v-model="newItem.email" />
                <span v-if="formErrors['email']" class="error text-danger">{{ formErrors['email'] }}</span>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" class="form-control" v-model="newItem.password" />
                <span v-if="formErrors['password']" class="error text-danger">{{ formErrors['password'] }}</span>
              </div>
              <div class="form-group">
                <label for="password_confirmation">Password Confirmation:</label>
                <input type="password" name="password_confirmation" class="form-control" v-model="newItem.password_confirmation" />
                <span v-if="formErrors['password_confirmation']" class="error text-danger">{{ formErrors['password_confirmation'] }}</span>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Item Modal -->
    <div class="modal-mask" v-show="showModal === 'edit-item'" transition="modal" id="edit-item">
    <div class="modal-wrapper">
      <div class="modal-container">
          <div class="modal-header">
            <button type="button" class="close" @click="closeModal" aria-label="Close"><span aria-hidden="true">×</span></button>
            <h4 class="modal-title" id="myModalLabel">Edit Item</h4>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateItem(fillItem.id)">
              <div class="form-group">
                <label for="title">Name:</label>
                <input type="text" name="name" class="form-control" v-model="fillItem.name" />
                <span v-if="formErrorsUpdate['name']" class="error text-danger">{{ formErrorsUpdate['name'] }}</span>
              </div>
              <div class="form-group">
                <label for="title">Email:</label>
                <input type="email" name="email" class="form-control" v-model="fillItem.email" />
                <span v-if="formErrorsUpdate['email']" class="error text-danger">{{ formErrorsUpdate['email'] }}</span>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" class="form-control" v-model="fillItem.password" />
                <span v-if="formErrorsUpdate['password']" class="error text-danger">{{ formErrorsUpdate['password'] }}</span>
              </div>
              <div class="form-group">
                <label for="password_confirmation">Password Confirmation:</label>
                <input type="password" name="password_confirmation" class="form-control" v-model="fillItem.password_confirmation" />
                <span v-if="formErrorsUpdate['password_confirmation']" class="error text-danger">{{ formErrorsUpdate['password_confirmation'] }}</span>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--<pre>{{ $data | json }}</pre>-->
</template>

<script>
import auth from '../auth'
import users from '../users'
export default {
  components: {
  },
  data () {
    return {
      searchQuery: '',
      gridColumns: ['id', 'name', 'email', 'created_at', 'updated_at'],
      users: [],
      formErrors: [],
      formErrorsUpdate: [],
      offset: 4,
      newItem: {'name': '', 'email': '', 'password': '', 'password_confirmation': ''},
      fillItem: {'name': '', 'email': '', 'password': '', 'password_confirmation': '', 'id': ''},
      pagination: {
        total: 0,
        count: 0,
        per_page: 0,
        current_page: 1,
        total_pages: 0
      },
      showModal: ''
    }
  },
  computed: {
    pagesNumber: function () {
      var pages = []
      var from = 1
      var to = this.pagination.total_pages

      while (from <= to) {
        pages.push(from)
        from++
      }
      return pages
    }
  },
  methods: {
    showCreateForm: function () {
      this.showModal = 'create-item'
    },
    closeModal: function () {
      this.showModal = ''
    },
    editItem: function (item) {
      this.fillItem.id = item.id
      this.fillItem.name = item.name
      this.fillItem.email = item.email
      this.showModal = 'edit-item'
    },
    updateItem: function (id) {
      var input = this.fillItem
      this.$http.post('users/' + id + '?' + auth.getTokenQueryParam(), input).then((response) => {
        this.changePage(this.pagination.current_page)
        this.fillItem = {'name': '', 'email': '', 'password': '', 'password_confirmation': '', 'id': ''}
        this.showModal = ''
        // toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
      }, (response) => {
        this.formErrorsUpdate = response.json().errors
      })
    },
    changePage: function (id) { // not needed?
      users.all(this, auth.getTokenQueryParam(), id)
    },
    storeItem: function () {
      var input = this.newItem
      this.$http.post('users?' + auth.getTokenQueryParam(), input).then((response) => {
        this.changePage(this.pagination.total_pages)
        this.newItem = {'name': '', 'email': '', 'password': '', 'password_confirmation': ''}
        this.showModal = ''
        // toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
      }, (response) => {
        this.formErrors = response.json().errors
      })
    },
    deleteItem: function (item) {
      this.$http.delete('users/' + item.id + '?' + auth.getTokenQueryParam()).then((response) => {
        this.changePage(this.pagination.current_page)
        // toastr.success('Item Deleted Successfully.', 'Success Alert', {timeOut: 5000});
      })
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
  }
  /*
  watch: {
    'pagination.current_page': function (val) {
      users.all(this, auth.getTokenQueryParam(), val)
    }
  }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
