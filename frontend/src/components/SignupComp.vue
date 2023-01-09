<!-- Signup page html  -->
<template>
  <div class="signup">
    <header>
      <div class="header_Container">
        <div class="header_LogoContainer">
          <img src="../assets/images/icon-above-font.png" alt="Groupomania logo" width="350" height="100">
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
        <Form @submit='handleRegister' :validation-schema="schema" id=form_Container>
          <div v-if="!successful">
            <div class="form_Group">
              <label for="username">Username</label>
              <Field name='username' type="text" class="form-control" id="username"></Field>
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form_Group">
              <label for="email">Email</label>
              <Field name='email' type="email" class="form-control" id="email"></Field>
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form_Group">
              <label for="password">Password</label>
              <Field name="password" type="password" class="form-control" id="password"></Field>
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form_Group">
              <input type="submit" value="Submit" id="submit">
            </div>
          </div>
          <div
            v-if="message"
            class="alert form_Group error"
            :class="successful ? 'alert-success' : 'alert-danger'"
          > {{message}} </div>
        </Form>
      </main>
    </body>
  </div>
</template>
<script>
import '../assets/css/normalize.css';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    name:'Signup-comp',
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(2, "Must be at least 2 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch('auth/register', user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
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