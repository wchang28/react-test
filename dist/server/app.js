"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var port = process.env.PORT || 8080;
var hostname = process.env.HOSTNAME || "127.0.0.1";
var app = express();
app.use(function (req, res, next) {
    console.log('**********************************************************************');
    console.log("[" + new Date().toISOString() + "]: incoming " + req.method + " request from " + req.connection.remoteAddress + ", url=" + req.url + ", headers: " + JSON.stringify(req.headers));
    console.log('**********************************************************************');
    console.log('');
    next();
});
// no-cache
//////////////////////////////////////////////////////////////////////////////////////
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
//////////////////////////////////////////////////////////////////////////////////////
app.use("/", express.static(path.join(__dirname, "../../public")));
// start the app service
app.listen(port, hostname, function () {
    console.log("[" + new Date().toISOString() + "]: app server listening on port " + hostname + ":" + port + " :-)");
});
//# sourceMappingURL=app.js.map