import { Account, Client, ID} from 'appwrite';
import conf from '../conf/conf';





export class AuthService {
    client=new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
            console.log("account", this.account)
           this.account=new Account(this.client)
            console.log("account", this.account)
    }
     async createAccount({email, password, name}){
        try {

            console.log("i am here");
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            console.log("credentials", {email, password, name});
            console.log("userAccount", userAccount);

            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }
      async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
        }
        return null
    }

    async logout(){
        try {  
            await this.account.deleteSessions()         /// also give session ("current ") so only corrent deleted
        } catch (error) {
            console.log("Appwrite service :: logout() :: ", error);
        }
    }
}

const authService=new AuthService();

export default authService