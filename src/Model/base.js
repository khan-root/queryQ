import axios from "axios";
import { BASE_URL } from "./AppUri";

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvbmVpZCI6IjEwMjY4NDU4Iiwib3JnX29uZWlkIjoiOTY3NzM3NSIsIm9yZ19uYW1lIjoiVEVTVF9PUkdfUXVlcnlRIiwiZnVsbF91c2VybmFtZSI6IlNhcm1hZCBGYWl6YW4gVWxsYWgiLCJmdWxsX2RwIjoiaHR0cHM6XC9cL29uZWlkLnZlZXZvdGVjaC5jb21cL2RwXC9maWxlc1wvNGQ1NDQxNzk0ZTZhNjczMDRlNTQ2NzNkLURFRkFVTFQuanBlZyIsInJlY29yZF9pZCI6IkRFRkFVTFQiLCJhY2Nlc3NfdG9rZW4iOiJhNTMzNDE4OTFtMjg2Nzg2NTE1ZjA4OWMxOTE5OTU1NmQ5ZDc1NzQ0ZDBjZTk3NTk4MGNhMTQxZTJhNiIsImF1ZCI6ImdhUDV6dWI1WDk5c20iLCJyb2xlX2lkIjoiQWRtaW4iLCJyb2xlX2RiX2lkIjoiNzMiLCJvdGhlcl9wZXJtaXNzaW9ucyI6bnVsbCwiYWxsb3dlZF9hcHBfdG9rZW4iOiIxM2ZiYWRhMzU5NDkxMmFhMTEzNDkxMzU5IiwiaWF0IjoxNjk3MTc2NzE4LCJleHAiOjE2OTcyNjMxMTgsIm9yZ19kYXRhIjp7Il9pZCI6OTY3NzM3NSwidXNlcl9vbmVpZCI6OTMyNjkzMywib3JnX25hbWUiOiJURVNUX09SR19RdWVyeVEiLCJvcmdfdHlwZSI6MTU4LCJudG5fbm8iOiIiLCJvcmdfYnJmX2ludHJvIjoiVEVTVF9PUkdfUXVlcnlRIiwidXNlcl9jb250YWN0IjoiMDMzNDA5MzM4NTAiLCJlbWFpbCI6ImZhcmF6YWhtYWRraGFuMTVAZ21haWwuY29tIiwiYWRkcmVzcyI6IlZUIFBlc2hhd2FyIiwiY291bnRyeV9pZCI6MTYyLCJjaXR5X2lkIjo4NTkwOSwib3JnX2RwIjp7ImZpbGVfaWQiOiI0ZjQ0NTU3OTRlNTEzZDNkIiwiZmlsZV9uYW1lIjoiMV8zODkzZmUzMjM4MTY3OTcucG5nIn0sImNvdW50cnlfY29kZSI6IlBLIn19.RlZXB7okDADebTgupUctIS88mAt3p3g3--lnjCBd_mE'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});



export const axiosInstanceMediaFiles = axios.create({
  baseURL: 'https://wa-api.veevotech.com',
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }
});


// export const socketIo = axios.create({
//   baseURL : 'https://queryq.veevotech.com',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }

// })



