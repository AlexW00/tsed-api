#!/usr/bin/env node
import { CliCore } from "@tsed/cli-core";
import { GenerateHttpClientCmd } from "src/commands/GenerateHttpClientCmd";
import { config } from "../config"; // Import your application configuration

CliCore.bootstrap({
	...config,
	// add your custom commands here
	commands: [GenerateHttpClientCmd],
}).catch(console.error);
