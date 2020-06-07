class Auth {

    SESSION_TIMEOUT_IN_DAYS = 2;

    constructor(token = "", user_id = "", userRole = "") {
        if(token) {
            localStorage.setItem('app-token', token);
            console.log(JSON.stringify(new Date()));
            localStorage.setItem('app-token-init', JSON.stringify(new Date()));
        }
        if (user_id) {
            localStorage.setItem('app-user-id', user_id);
        }
        if (userRole) {
            localStorage.setItem('app-user-role', userRole);
        }
    }
    
    isTokenValid() {
        let currentDate = new Date();
        let tokenInit = new Date(localStorage.getItem('app-token-init'));
        let tokenLifeTime = new Date();
        tokenLifeTime.setDate(tokenInit.getDate() + this.SESSION_TIMEOUT_IN_DAYS);

        if(tokenInit > currentDate || tokenLifeTime < currentDate) {
            localStorage.removeItem('app-token-init');
            localStorage.removeItem('app-token');
            return false;
        }

        return true;
    }

    getAuthToken() {
        return localStorage.getItem('app-token');
    }

    getUserId() {
        return localStorage.getItem('app-user-id');
    }
    getUserRole() {
        return localStorage.getItem('app-user-role');
    }

    logout() {
        let tokenInit = new Date(localStorage.getItem('app-token-init'));
        if(tokenInit) {
            localStorage.removeItem('app-token-init');
            localStorage.removeItem('app-token');
            localStorage.removeItem('app-user-id');
            localStorage.removeItem('app-user-role');
        }
    }
}
export default Auth;