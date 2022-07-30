import { Asset } from 'enmity/api/assets'

const filters: string[] = [
    "icon", 
    "icons",
    "toast", 
    "status", 
    "custom_status", 
    "emoji_picker", 
    "perks", 
    "video_calls", 
    "guild_scheduled_events", 
    "navigator", 
    "media",
    "invite_expiration_notice",
    "directory_channels",
    "guild_home",
    "instant_invite",
    "guild_sidebar",
    "hub",
    "tier_icons",
    "guild_profile",
    "main_tabs",
    "community",
    "discover"
]

export default (asset: Asset): Boolean => {
    if (asset.name.startsWith("ic"))
        return true
    else if (asset.name.includes("icon"))
        return true
    else if (asset.name.endsWith("splash"))
        return false
    else if (asset.name.endsWith("upsell"))
        return false
    else if (asset.name.includes("header"))
        return false
    else if (asset.name.endsWith("illustration"))
        return false
    else 
        return filters.some(filter => (asset.httpServerLocation+"/").includes("/"+filter+"/"))
}