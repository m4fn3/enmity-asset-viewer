import { FormRow, FormSwitch, FormSection } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
    settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
    return <>
        <FormRow
            label='Check for updates'
            trailing={
                <FormSwitch
                    value={settings.getBoolean('checkForUpdates', true)}
                    onValueChange={() => settings.toggle('checkForUpdates', true)}
                />
            }
        />
        <FormSection title="Experimental features">
            <FormRow
                label='Search in path'
                trailing={
                    <FormSwitch
                        value={settings.getBoolean('searchInPath', false)}
                        onValueChange={() => settings.toggle('searchInPath', false)}
                    />
                }
            />
        </FormSection>
    </>;
};