import Api from "../../../components/Api";

export const praktikumApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    "Content-Type": "application/json",
    "authorization": "8a10ae20-3876-4243-a54a-b307b1f8ac17"
  }
})
