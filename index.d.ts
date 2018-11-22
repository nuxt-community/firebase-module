import { firestore, database, functions, storage, auth } from 'firebase'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $fireStore: firestore.Firestore
    $fireDb: database.Database
    $fireFunc: functions.Functions
    $fireStorage: storage.Storage
    $fireAuth: auth.Auth
  }
}
