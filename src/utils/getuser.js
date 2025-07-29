export function getUserId(){
    const raw = localStorage.getItem("tokens");
    if (!raw) return false;

    try {
        const { access_token, refresh_token, userId, user_name } = JSON.parse(raw);
        return {userId, user_name}
    }
    catch (err) {
        return false;
    }


}