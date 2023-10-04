const get = (url) => {
    return new Promise((accept, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.responseType = "arraybuffer";
        req.setRequestHeader("Cache-Control", "no-cache");



        req.onerror = function (event) {
            reject(new Error("Network error"));
        };

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