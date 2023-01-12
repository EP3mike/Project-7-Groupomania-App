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
                            <div v-if="(post.postImage !== '')" class="text-center homepageCard_Description">
                                <img :src="post.postImage" alt="Responsive Image" class="img-fluid">
                            </div>
                            <p class="homepageCard_Description">
                                {{post.postDescription}}
                            </p>
                        </div>

                        <div v-if="(authorizedAccess == true)" id="button_Container">
                            <button @click.prevent="backToHome()" class="ownerButtons" id="back">BACK</button>
                            <button @click.prevent="modifyPostLink()" class="ownerButtons" id="modify">MODIFY</button>
                            <button @click='deletePost()' class="ownerButtons" id="delete">DELETE</button>
                        </div>
                        <div v-if="(authorizedAccess == false)" id="button_Container">
                            <button @click.prevent="backToHome()" class="ownerButtons text-center" id="back">BACK</button>
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
            post: [],
            authorizedAccess:''
        };
    },
    methods: {
        retrieveSpecificPost(id) {
            PostDataService.getOnePost(id)
                .then(response => {
                    this.post = response.data;
                    this.hasPermision(this.post.userId, this.$store.state.auth.user.id);
                    console.log(response.data);
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
            this.$router.push(submitPath + currentPostId);
        },
        //maybe add a check if user & post combo exists to not send a req or include time
        hasRead(Id,currentUser) {
            let data = {
                userId: currentUser,
                postId: Id
            }
            
            PostDataService.updatePostReaders(data, Id)
                .then(response => {
                    return response.data;
                    // console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        hasPermision(Id, currentUser){
            let postUserId = Id;
            let currentUserId = currentUser;
            if(postUserId === currentUserId){
                this.authorizedAccess = true;
            }
            else  {
                this.authorizedAccess = false;
            }
        }

            
    },
    mounted() {
        this.hasRead(this.$route.params.id, this.$store.state.auth.user.id);
        this.retrieveSpecificPost(this.$route.params.id);
        

        
    }
}
</script>
<style lang="scss" scoped>
    @import '../assets/css/sass/style.scss';
    @import '../assets/css/sass/homepage.scss';
    @import '../assets/css/sass/post.scss';
</style>