const get = (url) => {
    return new Promise((accept, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";

        req.onload = function (event) {
            var resp = req.response;
            if (resp) {
                accept(resp);
            }
        };

        req.send(null);
    });
}

export default get;