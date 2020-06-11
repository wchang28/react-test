import express from "express";
import * as path from "path";
const port = ((process.env.PORT as any) as number) || 8080;
const hostname = process.env.HOSTNAME || "127.0.0.1";

const app = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.log('**********************************************************************');
	console.log(`[${new Date().toISOString()}]: incoming ${req.method} request from ${req.connection.remoteAddress}, url=${req.url}, headers: ${JSON.stringify(req.headers)}`);
	console.log('**********************************************************************');
	console.log('');
	next();
});

// no-cache
//////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
});
//////////////////////////////////////////////////////////////////////////////////////

app.use("/", express.static(path.join(__dirname, "../../public")));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// start the app service
app.listen(port, hostname, () => {
    console.log(`[${new Date().toISOString()}]: app server listening on port ${hostname}:${port} :-)`);
});