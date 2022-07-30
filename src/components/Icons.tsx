import { FormRow, ScrollView, Image } from 'enmity/components';
import { find, Asset, getIDByName } from 'enmity/api/assets'
import { React, Toasts } from 'enmity/metro/common';
import { getByProps, getByName } from 'enmity/metro'
import { makeStore } from 'enmity/api/settings'

const Settings  = makeStore("AssetViewer")
const { setString: setClipboard } = getByProps('setString')
const copyIcon = getIDByName('ic_message_copy')

const Search = getByName('StaticSearchBarContainer');

export default () => {
   const [icons, setIcons] = React.useState([])
   const [query, setQuery] = React.useState([])

   React.useEffect(() => {
      let icons: Asset[] = []
      find(asset => { 
         if (asset.name.includes("icon") || asset.name.startsWith("ic_") || asset.httpServerLocation?.includes("icon"))
            icons.push(asset); 
         return false 
      })
      setIcons(icons)
   }, [])

   
   return <>
      <Search
         placeholder="Search Icons by Name"
         onChangeText={text => setQuery(text)}
      />
      <ScrollView>
         {icons.filter(icon => (icon.name+"/"+(Settings.get("searchInPath", false) ? icon.httpServerLocation : "")).includes(query)).map(icon => 
            <FormRow 
               label={icon.name}
               trailing={
                  <Image 
                     source={icon.id}
                     style={{
                        resizeMode: "contain",
                        width: 24,
                        height: 24
                     }}
                  />
               }
               onPress={() => {
                  setClipboard(icon.name)
                  Toasts.open({ 
                     content: "Copied to clipboard",
                     source: copyIcon
                  })
               }}
            />
         )}
      </ScrollView>  
   </>;
};