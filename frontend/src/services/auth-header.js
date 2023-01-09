// helper function for accessing protected resources
// retrieves jwt token stored in local storage to be compared to by auth backend middleware
//checks if logged in user w/ accessToken exists in local storage or returns empty obj
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.accessToken) {
        return {'x-access-token': user.accessToken};
    } else {
        return {};
    }
}