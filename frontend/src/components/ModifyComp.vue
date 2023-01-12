<!-- modify post page  -->
<template>
    <body class="modify">
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
            <form @submit.prevent="updateSpecificPost" enctype="multipart/form-data" id= form_Container>
               <div class="form_Group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id ='title' formControlName='title' required v-model="post.postTitle">
                </div>
                <div class="form_Group">
                    <label for="file">Select an image:</label>
                    <input type="file" id="file" ref='postImage' @change="fileLoaded" formControlName="file">
                </div>
                <div class="form_Group">
                    <label for="description">Description</label>
                    <textarea id="description" rows="5" formControlName="description" required v-model="post.postDescription"></textarea>
                </div> 
                <div class="form_Group">
                    <input type="submit" value="Submit" id="submit">
                </div>
            </form>
            
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
                    <RouterView/>
                </ul>
            </div>
        </footer>
    </body>
</template>
<script>
import '../assets/css/normalize.css';
import PostDataService from '../services/post.service';
export default {
    name:'Modify-comp',
    data() {
        return {
            post: [],
            emptyFile: true,
        };
    },
    methods: {
        fileLoaded() {
            this.emptyFile = false;
            console.log(this.emptyFile);
        },
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
            // var data = {
            //     id: this.post.id,
            //     postTitle: this.post.postTitle,
            //     postImage: this.post.postImage,
            //     postDescription: this.post.postDescription
            // };
            const data = new FormData();
            data.append('id', this.post.id);
            data.append('postTitle',this.post.postTitle);

            //checks to send file or empty instead of undefined for post image field
            if(this.emptyFile){
                data.append('postImage', this.post.postImage);
            } else {
                data.append('postImage', this.$refs.postImage.files[0]);
            }

            data.append('postDescription', this.post.postDescription);
            PostDataService.updatePost(data, this.post.id)
                .then(response => {
                    console.log(response.data);
                    this.LinkToPost();
                })
                .catch(e => {
                    console.log(e);
                    this.LinkToModifyPost();
                });
        },
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        },
        LinkToPost() {
            let currentPostId = this.post.id;
            let postPath = '/post/';
            this.$router.push(postPath + currentPostId);
        },
        LinkToModifyPost() {
            let currentPostId = this.post.id;
            let modifyPostPath = '/modify/';
            this.$router.push(modifyPostPath + currentPostId);
        }
    },
    mounted() {
        this.retrieveSpecificPost(this.$route.params.id);
    }

};
</script>
<style lang="scss" scoped>
    @import '../assets/css/sass/style.scss';
    @import '../assets/css/sass/homepage.scss';
    @import '../assets/css/sass/post.scss';
    @import '../assets/css/sass/welcome.scss';
</style>