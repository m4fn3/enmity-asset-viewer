import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { registerCommands, unregisterCommands } from 'enmity/api/commands'
import manifest from '../manifest.json';

import { assetsCommand } from './commands/assets'

const AssetViewer: Plugin = {
   ...manifest,

   onStart() {
      registerCommands("asset-viewer", [
         assetsCommand
      ])
   },

   onStop() {
      unregisterCommands("asset-viewer")
   }
};

registerPlugin(AssetViewer);
