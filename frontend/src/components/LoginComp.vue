<template>
  <div class="login">
    <header>
      <div class="header_Container">
        <div class="header_LogoContainer">
          <img class="img-responsive" src="../assets/images/icon-above-font.png" alt="Groupomania logo" width="350"
            height="100">
        </div>
        <nav>
          <ul>
            <RouterLink to="/signup">
              <li>Signup</li>
            </RouterLink>
            <RouterLink to="/">
              <li>Login</li>
            </RouterLink>
            <RouterView />
          </ul>
        </nav>
      </div>
    </header>

    <body>
      <main>
        <Form @submit='handleLogin' :validation-schema="schema" id=form_Container>
          <div class="form_Group">
            <label for="email">Email</label>
            <Field name='email' type="email" class="form-control" id="email"></Field>
            <ErrorMessage name="email" class="error-feedback" as="p" />
          </div>
          <div class="form_Group">
            <label for="password">Password</label>
            <Field name="password" type="password" class="form-control" id="password"></Field>
            <ErrorMessage name="password" class="error-feedback" />
          </div>
          <div class="form_Group">
            <input type="submit" value="Submit" id="submit">
          </div>
          <div class="form_Group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </Form>
      </main>
    </body>
  </div>
</template>
<script>
import '../assets/css/normalize.css';
import{ Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
// const API_URL = 'http://localhost:8080/api/auth/login';
export default {
    name:'LoginComp',
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/homepage");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch('auth/login', user).then(
        () => {
          this.$router.push("/homepage");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
<style lang="scss" scoped>
 @import '../assets/css/sass/style.scss';
 @import '../assets/css/sass/welcome.scss';
</style>