import React, { useState, useEffect } from "react";
import DiagramButtons from "./DiagramButtons";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];


const DiagramTable = ({ diagrams, setItemEdit, setItemRemove, dataVersion }) => {
    const [dataTable, setDataTable] = useState(diagrams.map(t => {
        return ({
            title: t.title,
            id: t.id,
            type: t.type,
            setRemove: (id) => setItemRemove(id),
            setEdit: (id) => setItemEdit(id),
        }
        )
    }));

    useEffect(() => {
        const temp = diagrams.map(t => {
            return ({
                title: t.title,
                type: t.type,
                id: t.id,
                progress: t.progress,
                setEdit: (id) => setItemEdit(id),
                setRemove: (id) => setItemRemove(id),
            }
            )
        });
        setDataTable(temp);
    }, [dataVersion])

    return (
        <DataGrid
            dataSource={dataTable}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
        >
            <GroupPanel visible={true} />
            <SearchPanel visible={true} highlightCaseSensitive={true} />
            <Grouping autoExpandAll={true} />

            <Column dataField="type" caption="Type" groupIndex={1} />

            <Column
                dataField="title"
                caption="Diagram"
                dataType="string"
                alignment="left"
                allowGrouping={false}
            />
            <Column
                caption="Options"
                dataType="string"
                alignment="center"
                allowGrouping={false}
                cellRender={DiagramButtons}
            />

            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
        </DataGrid>
    )
};

export default DiagramTable;