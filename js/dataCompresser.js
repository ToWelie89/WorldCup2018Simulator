import { directoryRootPath } from './constants';

const compress = (data) => {
    return $.ajax({
        url: constants.directoryRootPath + 'model/dataCompression.php',
        data: {
            id: data,
            action: "compress"
        },
        type: 'POST'
    });
}

const decompress = (data) => {
    return $.ajax({
        url: constants.directoryRootPath + 'model/dataCompression.php',
        data: {
            id: data,
            action: "decompress"
        },
        type: 'POST'
    });
}

export {
    compress,
    decompress
}