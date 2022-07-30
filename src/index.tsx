import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { registerCommands, unregisterCommands } from 'enmity/api/commands'
import { React } from 'enmity/metro/common';

import manifest from '../manifest.json';
import Settings from './components/Settings'

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
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(AssetViewer);
