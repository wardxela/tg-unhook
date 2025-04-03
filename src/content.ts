import "./manifest.json" with { type: "file" };
import "./styles.css" with { type: "file" };
import "./icons/icon16.png";
import "./icons/icon32.png";
import "./icons/icon48.png";
import "./icons/icon128.png";

import { actions } from "./actions";
import { createActionRunner } from "./runner";

createActionRunner(actions).start();
