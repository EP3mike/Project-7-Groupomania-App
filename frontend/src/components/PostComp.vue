<!-- Post page html -->
<template>
    <body class="post">
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
                        <!-- <a href="./homepage.html">
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
                    <div class="homepagePost_Card">
                        <div class="homepageCard_Content">
                           <!-- post content goes here -->
                            <h3 class="homepageCard_Title">
                                {{ post.postTitle}}
                            </h3>
                            <p class="homepageCard_Description">
                                {{post.postDescription}}
                            </p>
                        </div>

                        <div id="button_Container">
                            <button @click.prevent="backToHome()" class="ownerButtons" id="back">BACK</button>
                            <button @click.prevent="modifyPostLink()" class="ownerButtons" id="modify">MODIFY</button>
                            <button @click='deletePost()' class="ownerButtons" id="delete">DELETE</button>
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
    name:'Post-comp',
    data() {
        return {
            post: []
        };
    },
    methods: {
        retrieveSpecificPost(id) {
            PostDataService.getOnePost(id)
                .then(response => {
                    this.post = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        updateSpecificPost() {
            let data = {
                id: this.post.id,
                postTitle: this.post.postTitle,
                postImage: this.post.postImage,
                postDescription: this.post.postDescription
            };
            PostDataService.updatePost(data, this.post.id)
                .then(response => {
                    console.log(response.data);
                    this.mounted();
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deletePost() {
            PostDataService.deletePost(this.post.id)
                .then(response => {
                    console.log(response.data);
                    this.backToHome();
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
        modifyPostLink() {
            let currentPostId = this.post.id;
            let submitPath = '/modify/';
            console.log(submitPath + currentPostId);
            this.$router.push(submitPath + currentPostId);
        },
        //maybe add a check if user & post combo exists to not send a req or include time
        hasRead(Id,currentUser) {
            let data = {
                userId: currentUser,
                postId: Id
            }
            console.log(data);
            // for(let readers in this.post.listOfReaders) {
            //     console.log(readers);
            // }
            
            PostDataService.updatePostReaders(data, Id)
                .then(response => {
                    return response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

            
    },
    mounted() {
        this.retrieveSpecificPost(this.$route.params.id);
        this.hasRead(this.$route.params.id, this.$store.state.auth.user.id);
    }
}
</script>
<style lang="scss" scoped>
    @import '../assets/css/sass/style.scss';
    @import '../assets/css/sass/homepage.scss';
    @import '../assets/css/sass/post.scss';
</style>