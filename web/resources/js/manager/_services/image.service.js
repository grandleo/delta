import { fetchClient } from '../_helpers';

export const imageService = {
    store,
};

function store(dest, dest_id, files) {
    const formData = new FormData();

    formData.append('dest', dest);
    formData.append('dest_id', dest_id);

    for (let i = 0; i < files.length; i++) {
        formData.append('files[]', files[i]);
    }

    const requestOptions = {
        method: 'POST',
        url: 'images',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
    };

    return fetchClient()(requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.data;
}
