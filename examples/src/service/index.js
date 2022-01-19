import httpRequest from "@/plugins/http-request";

// get versions
export function getVersions() {
    return new Promise((resolve, reject) => {
        let net = window.location;

        const isDev = process.env.NODE_ENV === "development";

        let url = `${net.protocol}//${net.hostname}:${net.port}`;

        // 包含 /vue-easytable/ 目录
        if (!isDev) {
            url += "/vue-easytable";
        }
        url += `/versions.json?t=${new Date().getTime()}`;

        httpRequest({
            url: url,
            method: "get",
        })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
