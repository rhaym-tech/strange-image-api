// load and validate environment variables
import "dotenv/config";
import validateEnv from "./utils/validateEnv";
validateEnv();

import App from "./app";

// controllers
import DocsController from "./controllers/docs.controller";
import FilterController from "./controllers/filters.controller";
import GeneratorsController from "./controllers/generators.controller";
import OverlaysController from "./controllers/overlays.controller";
import UtilsController from "./controllers/utils.controller";
import User from "./schemas/User";

const app = new App([
    new DocsController("/docs"),
    new FilterController("/api/filters"),
    new GeneratorsController("/api/generators"),
    new OverlaysController("/api/overlays"),
    new UtilsController("/api/utils"),
]);

async function init() {
    if (process.env.AUTHENTICATION === "1") await User.init();
    app.listen(process.env.PORT as string);
}

init();
