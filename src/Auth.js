class Auth {

    SESSION_TIMEOUT_IN_DAYS = 2;

    constructor(token = "") {
        if(token) {
            localStorage.setItem('app-token', token);
            console.log(JSON.stringify(new Date()));
            localStorage.setItem('app-token-init', JSON.stringify(new Date()));
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

    logout() {
        let tokenInit = new Date(localStorage.getItem('app-token-init'));
        if(tokenInit) {
            localStorage.removeItem('app-token-init');
            localStorage.removeItem('app-token');
        }
    }
}
export default Auth;