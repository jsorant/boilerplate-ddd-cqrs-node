import { Application } from "../../Infra/WebServer/Application";

// TODO DI

const application = new Application();
application.start(3000);
