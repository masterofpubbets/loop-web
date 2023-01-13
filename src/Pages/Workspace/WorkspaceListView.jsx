import React from "react";
import DataGrid, { Column } from 'devextreme-react/data-grid';
import WorkspaceDatarow from "./WorkspaceDatarow";

const WorkspaceListView = ({ workspaces }) => {

    return (
        <DataGrid id="gridContainer"
            dataSource={workspaces}
            keyExpr="id"
            columnAutoWidth={true}
            showBorders={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            dataRowRender={WorkspaceDatarow}>
            <Column caption="Logo" width={100} allowFiltering={false} allowSorting={false} />
            <Column dataField="workspaceName" caption="Name" />
            <Column dataField="createdAt" dataType="date" />
            <Column dataField="lastUpdate" dataType="date" />
            <Column dataField="isDefault" caption="Is Default"/>
        </DataGrid>
    )
};

export default WorkspaceListView;