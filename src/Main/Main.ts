import { Application } from "../Infra/WebServer/Application";
import { ComponentRegistry } from "./ComponentsRegistry";
import { ControllersFactory } from "./ControllersFactory";

const registry = new ComponentRegistry();
const controllersFactory = new ControllersFactory(registry);
const application = new Application(controllersFactory);

application.start(3000);
