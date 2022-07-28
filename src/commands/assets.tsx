import { 
    Command, 
    ApplicationCommandInputType, 
    ApplicationCommandType,
    ApplicationCommandOptionType
} from 'enmity/api/commands';
import { Navigation } from 'enmity/metro/common'

import Page from '../components/Page'

import Icons from '../components/Icons'

const assetsCommand: Command = {
    id: "assets-command",
    name: "assets",
    displayName: "assets",
    description: "Show Assets",
    displayDescription: "Browse Assets provided by the Asset API",
    type: ApplicationCommandType.Chat,
	inputType: ApplicationCommandInputType.BuiltInText,
    options: [
        {
            name: "type",
            displayName: "type",
            description: "Asset Type",
            displayDescription: "Type of the Assets",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "icons",
                    displayName: "icons",
                    value: "icons"
                },
            ]
        }
    ],
    execute: async  function (args, message) {
        switch (args[0].value) {
            case "icons":
                Navigation.push(Page, { component: Icons, name: "Asset Viewer: Icons" })
                break;
        }
    
        return {}
    } 
 }

 export { assetsCommand }