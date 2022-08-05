import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { registerCommands, unregisterCommands } from 'enmity/api/commands'
import { React } from 'enmity/metro/common';
import { getBoolean } from 'enmity/api/settings'

import manifest from '../manifest.json';
import checkUpdates from './checkUpdates'
import SettingsComponent from './components/Settings'

import { assetsCommand } from './commands/assets'

const AssetViewer: Plugin = {
   ...manifest,

   onStart() {
      if (getBoolean("AssetViewer", "checkForUpdates", true)) {
         checkUpdates("https://github.com/devicarus/enmity-asset-viewer")
      }
      
      registerCommands("asset-viewer", [
         assetsCommand
      ])
   },

   onStop() {
      unregisterCommands("asset-viewer")
   },

   getSettingsPanel({ settings }) {
      return <SettingsComponent settings={settings} />;
   }
};

registerPlugin(AssetViewer);
