import React, { useEffect, createRef, Fragment } from "react";
import Diagram, {
    ContextMenu,
    ContextToolbox,
    PropertiesPanel,
    Group,
    Tab,
    HistoryToolbar,
    ViewToolbar,
    MainToolbar,
    Command,
    Toolbox,
} from 'devextreme-react/diagram';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';


const pageCommands = ['pageSize', 'pageOrientation', 'pageColor'];
const menuCommands = ['bringToFront', 'sendToBack', 'lock', 'unlock'];

const DiagramViewer = ({ data, SaveData }) => {
    const diagramRef = createRef();

    const getData = () => {
        const diagramContent = JSON.parse(diagramRef.current.instance.export());
        SaveData(diagramContent)
    };

    useEffect(() => {
        const diagram = diagramRef.current.instance;
        diagram.import(JSON.stringify(data));
    }, []);

    return (
        <Fragment>
            <Button onClick={getData} variant="contained" startIcon={<SaveIcon />} size="small">
                Save
            </Button>
            <Diagram id="diagram" ref={diagramRef} >
                <ContextMenu enabled={true} commands={menuCommands} />
                <ContextToolbox enabled={true} category="flowchart" shapeIconsPerRow={5} width={200} />
                <PropertiesPanel visibility="visible">
                    <Tab>
                        <Group title="Page Properties" commands={pageCommands} />
                    </Tab>
                </PropertiesPanel>
                <HistoryToolbar visible={false} />
                <ViewToolbar visible={true} />
                <MainToolbar visible={true}>
                    <Command name="undo" />
                    <Command name="redo" />
                    <Command name="separator" />
                    <Command name="fontName" />
                    <Command name="fontSize" />
                    <Command name="separator" />
                    <Command name="bold" />
                    <Command name="italic" />
                    <Command name="underline" />
                    <Command name="separator" />
                    <Command name="fontColor" />
                    <Command name="lineColor" />
                    <Command name="fillColor" />
                    <Command name="separator" />

                </MainToolbar>
                <Toolbox visibility="visible" showSearch={false} shapeIconsPerRow={4} width={220}>
                    <Group category="general" title="General" />
                    <Group category="flowchart" title="Flowchart" expanded={true} />
                </Toolbox>
            </Diagram>
        </Fragment>
    )
};

export default DiagramViewer;