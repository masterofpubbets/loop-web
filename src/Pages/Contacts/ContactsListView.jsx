import React from "react";
import DataGrid, { Column } from 'devextreme-react/data-grid';
import ContactsDatarow from "./ContactsDatarow";

const ContactsListView = ({ workspaces }) => {

    return (
        <DataGrid id="gridContainer"
            dataSource={workspaces}
            keyExpr="id"
            columnAutoWidth={true}
            showBorders={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            dataRowRender={ContactsDatarow}>
            <Column caption="Logo" width={100} allowFiltering={false} allowSorting={false} />
            <Column dataField="contactName" caption="Full Name" />
            <Column dataField="job" caption="Job" />
            <Column dataField="mobile" caption="Mobile" />
            <Column dataField="phone" caption="Phone" />
            <Column dataField="email" caption="Email" />
            <Column dataField="address" caption="Address" />
            <Column dataField="workGroup" caption="Workgroup" />
            <Column dataField="companyName" caption="Company" />
        </DataGrid>
    )
};

export default ContactsListView;