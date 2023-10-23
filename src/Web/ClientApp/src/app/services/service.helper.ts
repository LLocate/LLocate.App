import { environment } from "src/environments/environment";

export function getAPI(): string {
    return environment.serverUrl;
}