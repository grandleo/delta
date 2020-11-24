import axios from 'axios';

export function http() {
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Accept': 'multipart/form-data, application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'X-CSRF-TOKEN': document.head.querySelector("[name~=csrf-token][content]").content
      },
    };

    // create instance
    const instance = axios.create(defaultOptions);

    instance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      return Promise.reject(error);
    });

    return instance;
}
