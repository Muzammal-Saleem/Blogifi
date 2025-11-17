import { Client, Databases, Query, Storage, ID } from "appwrite";
import conf from "../conf/conf";



export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const documentId = slug || ID.unique();
            const res = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                documentId,
                { title, content, featuredImage, status, userId }
            );
            return res;
        } catch (error) {
            console.log("appWrite Service ::  createPost :: error", error);
        }
        return false;
    }

    async updatePost(id, { title, content, featuredImage, status }) {
        try {
            const res = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                { title, content, featuredImage, status }
            );
            return res;
        } catch (error) {
            console.log("appWrite Service ::  updatePost :: error", error);
        }
        return false;
    }

    async deletePost(id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
            return true;
        } catch (error) {
            console.log("appWrite Service ::  deletePost :: error", error);
        }
        return false;
    }

    async getPost(id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            );
        } catch (error) {
            console.log("appWrite Service ::  getPost :: error", error);
        }
        return false;
    }

    async getposts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("appWrite Service ::  getposts :: error", error);
        }
        return false;
    }

    /// file Uplode Service
    async uplodeFile(file) {
        try {
            console.log("appWrite Service :: uplodeFile :: file", file);
            const res = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            console.log("appWrite Service :: uplodeFile :: res", res);
            return res;
        } catch (error) {
            console.log("appWrite Service :: uplodeFile :: error", error);
        }
        return false;
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
        } catch (error) {
            console.log("appWrite Service ::  deleteFile :: error", error);
        }
        return false;
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    }
}

const service = new Service();
export default service;