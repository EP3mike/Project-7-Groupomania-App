<!-- Settings page html -->
<template>
    <body class="settings">
        <header> 
            <div class = "header_Container">
                <div class="header_LogoContainer">
                    <img src="../assets/images/icon-above-font.png" alt="Groupomania logo" width="350" height="100">
                </div>
                <nav>
                    <ul>
                        <RouterLink to="/homepage">
                            <li>Home</li>
                        </RouterLink>
                        <RouterLink to="/settings">
                            <li>Settings</li>
                        </RouterLink>
                        <RouterView/>
                        <!-- <a href="./settings.html">
                            <li>Settings</li>
                        </a>
                        <a href="./homepage.html">
                            <li>Home</li>
                        </a> -->
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <div class="homepagePost_Container">
                <div class="homepagePost_Grid">
                    <div class="homepagePost_Card">
                        <div class="homepageCard_Content">
                            <form id= form_Container>
                                <div class="form_Group">
                                    <label for="username">Username</label>
                                    <input type="text" class="form-control" id="username" required v-model="settings.username">
                                </div>
                                <div class="form_Group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id ='email' formControlName='email' required v-model="settings.email">
                                </div>
                                <div class="form_Group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" formControlName="password" required v-model="settings.password">
                                </div> 
                            </form>
                        </div>
                        <div id="button_Container">
                            <button @click="backToHome" class="ownerButtons" id="back">BACK</button>
                            <button @click.prevent="updateSpecificUser" class="ownerButtons" id="modify">MODIFY</button>
                            <button @click="deletePost" class="ownerButtons" id="delete">DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div id="footer__container">
                <p id="footer__logo">Groupomania</p>
                <ul>
                    <li><RouterLink to="/homepage"> <i class="fas fa-home"></i> Home</RouterLink></li>
                    <li><RouterLink to="/settings"> <i class="fas fa-cog"></i> Settings</RouterLink></li>
                    <li><RouterLink to="/submit"> <i class="fas fa-sticky-note"></i> New post</RouterLink></li>
                    <li><a href @click.prevent="logOut"> <i class="fas fa-sign-out-alt
                        "></i> Logout</a></li>
                    <li><a href="mailto:contact@groupomania.com"> <i class="fas fa-paper-plane"></i> Contact</a></li>
                </ul>
            </div>
        </footer>
    </body>
</template>
<script>
import '../assets/css/normalize.css';
import userDataService from '../services/user.service';
export default {
    name:'Settings-comp',
    data() {
        return {
            settings: []
        }
    },
    methods: {
        retrieveSpecificUser() {
            userDataService.getUserById(this.currentUser.id)
                .then(response => {
                    this.settings = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateSpecificUser() {
            var data = {
                username: this.settings.username,
                email: this.settings.email,
                password: this.settings.password
            }
            userDataService.updateUser(data, this.currentUser.id)
                .then(response => {
                    this.settings = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deletePost() {
            userDataService.deleteUser(this.currentUser.id)
                .then(response => {
                    console.log(response.data);
                    this.logOut();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        },
        backToHome() {
            this.$router.push('/homepage');
        },

    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    mounted() {
        if(!this.currentUser) {
            this.$router.push('/');
        }
        else {
            this.retrieveSpecificUser();
        }
    }
}
</script>
<style lang="scss" scoped>
    @import '../assets/css/sass/style.scss';
    @import '../assets/css/sass/post.scss';
    @import '../assets/css/sass/homepage.scss';
    @import '../assets/css/sass/welcome.scss';
    @import '../assets/css/sass/settings.scss';
</style>