#!/usr/bin/env node
import { CliCore } from "@tsed/cli-core";
import { GenerateHttpClientCmd } from "src/commands/GenerateHttpClientCmd";
import { Server } from "src/Server";
import { config } from "../config"; // Import your application configuration

CliCore.bootstrap({
	...config,
	server: Server,
	commands: [GenerateHttpClientCmd],
}).catch(console.error);
