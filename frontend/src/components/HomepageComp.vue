<!-- homepage html  -->
<template>
    <body class="homepage">
        <header> 
            <div class = "header_Container">
                <div class="header_LogoContainer">
                    <img src="../assets/images/icon-left-font.png" alt="Groupomania logo" width="350" height="100">
                </div>
                <nav>
                    <ul>
                        <RouterLink to="/submit">
                            <li>Submit</li>
                        </RouterLink>
                        <RouterLink to="/homepage">
                            <li>Home</li>
                        </RouterLink>
                        <RouterLink to="/settings">
                            <li>Settings</li>
                        </RouterLink>
                        <RouterView/>
                        <!-- <a href="./submit.html">
                            <li>Submit</li>
                        </a>
                        <a href="./homepage.html">
                            <li>Home</li>
                        </a>
                        <a href="./settings.html">
                            <li>Settings</li>
                        </a> -->
                    </ul>
                </nav>
            </div>
        </header>

    
        <main>
            <div class="homepagePost_Container">
                <div class="homepagePost_Grid">
                    <!-- fetched posts insert here -->
                    <!-- <a href='/post/`${post._id}`' class="homepagePost_Card" v-for="post in posts" :key="post">
                        <div class="homepageCard_Content">
                            <h3 class="homepageCard_Title">
                                {{ post.postTitle}}
                            </h3>
                            <p class="homepageCard_Description">
                                {{post.postDescription}}
                            </p>
                        </div>
                    </a> -->

                    <!-- <div v-for="post in posts" class="homepagePost_Card" :key="post">
                        <RouterLink :to="'/post/' + post.id" v-if="notRead" class="homepagePost_Card">
                            <div class="homepageCard_Content ">
                            <h3 class="homepageCard_Title">
                                {{ post.postTitle}}
                            </h3>
                            <p class="homepageCard_Description">
                                {{post.postDescription}}
                            </p>
                        </div>
                        </RouterLink>
                        <RouterLink :to="'/post/' + post.id" v-else class="homepagePost_Card Opaque">
                            <div class="homepageCard_Content ">
                            <h3 class="homepageCard_Title">
                                {{ post.postTitle}}
                            </h3>
                            <p class="homepageCard_Description">
                                {{post.postDescription}}
                            </p>
                        </div>
                        </RouterLink>
                        
                    
                    </div> -->

                    <RouterLink :to="'/post/' + post.id" class="homepagePost_Card"  v-for="post in posts" :key="post">
                        <div class="homepageCard_Content ">
                            <h3 class="homepageCard_Title">
                                {{ post.postTitle}}
                            </h3>
                            <p class="homepageCard_Description">
                                {{post.postDescription}}
                            </p>
                        </div>
                    </RouterLink>
                    
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
                    <li><a href @click.prevent="logOut"> <i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    <li><a href="mailto:contact@groupomania.com"> <i class="fas fa-paper-plane"></i> Contact</a></li>
                    
                </ul>
            </div>
        </footer>
    </body>
</template>
<script>
import '../assets/css/normalize.css';
import PostDataService from '../services/post.service';
export default {
    name: 'Homepage-comp',
    data() {
        return {
            posts: [],
            post: [],
            // notRead: true,
            
        }
    },
    methods: {
        retrievePosts() {
            PostDataService.getAllPosts()
                .then(response => {
                    this.posts = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        retrieveSpecificPost() {
            PostDataService.getOnePost(this.postId)
                .then( response => {
                    this.post = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },


        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        },

    },
    
    mounted() {
        this.retrievePosts();
    }
};
</script>
<style lang="scss" scoped>
    @import '../assets/css/sass/style.scss';
    @import '../assets/css/sass/homepage.scss';

    .Opaque {
        background-color:rgba(240, 240, 240, .5);
        border: dashed 3px black;
    }
</style>