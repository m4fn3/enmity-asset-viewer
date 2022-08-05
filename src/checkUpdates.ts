import { REST, Dialog, Linking } from 'enmity/metro/common'
import { getByProps } from 'enmity/metro'
import { getPlugin } from 'enmity/managers/plugins'

const Clipboard = getByProps('setString')

interface Update {
    version: string
}

const isUpgrade = (currentVersion: string, latestVersion: string): boolean => {
    return latestVersion.localeCompare(currentVersion, undefined, { numeric: true }) === 1;
};

const getRawURL = (githubURL: string, githubBranch: string, filePath: string): string => {
    return githubURL.replace("github.com", "raw.githubusercontent.com") + "/" + githubBranch + "/" + filePath
}

const prettifyChangelog = (changesRaw: string): string => {
    return changesRaw
        .split("\n")
        .filter(line => !(line.startsWith("#") || line === ""))
        .map(line => line.replace("- ", ""))
        .join("\n")
}

const selectChangesByVersion = (changelogRaw: string, currentVersion: string): string => {
    return changelogRaw
        .split(currentVersion)[0]
        .split("\n")
        .filter(line => !line.startsWith("<"))
        .join("\n")
}

const commitTypeBlacklist: string[] = ["♻", "🔨", "⚰️", "📝", "🔖", "🔧", "🧑‍💻"]
const selectChangesByType = (changes: string): string => {
    return changes
        .split("\n")
        .filter(line => commitTypeBlacklist
            .every(type => type.charCodeAt(0) !== line.charCodeAt(0))
        )
        .join("\n")
}

const checkUpdates = (githubURL: string, githubBranch: string = "master", showDialog: boolean = true): Promise<Update> => {
    const manifestURL = getRawURL(githubURL, githubBranch, "manifest.json")

    const promise = new Promise<Update>((resolve, reject) => {
        REST.get(manifestURL + "?" + Math.floor(Math.random() * 100)).then(manifestRaw => {
            const manifest = JSON.parse(manifestRaw.text)
            const plugin = getPlugin(manifest.name)

            if (isUpgrade(plugin.version, manifest.version)) {
                if (showDialog) {
                    REST.get(getRawURL(githubURL, githubBranch, "CHANGELOG.md") + "?" + Math.floor(Math.random() * 100)).then(response => {
                        const changelogRaw = selectChangesByVersion(response.text, plugin.version)
                        const changelogPretty = prettifyChangelog(changelogRaw)
                        const changelog = selectChangesByType(changelogPretty)

                        Dialog.show({
                            title: "Enmity AssetViewer",
                            body: `An update to **v${manifest.version}** is available on [GitHub](${githubURL}/releases/tag/latest)\n\n**__Changelog__:**\n${changelog}`,
                            confirmText: "Copy URL",
                            cancelText: "Close",
                            onConfirm: () => Clipboard.setString(githubURL + "/releases/download/latest/"+manifest.name+".js")
                        })
                    })
                }

                resolve({ version: manifest.version })
            } else {
                reject()
            }
        }).catch(response => {
            if (response.status === 404) {
                Dialog.show({
                    title: "Enmity AssetViewer",
                    body: "Failed to check for updates, please update manually from GitHub",
                    confirmText: "Open GitHub",
                    cancelText: "Close",
                    onConfirm: () => Linking.openURL(githubURL+"/releases/tag/latest"),
                })
            }

            reject()
        })
    })

    return promise
}


export default checkUpdates