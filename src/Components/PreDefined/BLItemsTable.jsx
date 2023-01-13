import React, { useState, useEffect } from "react";
import BLItemCell from "./BLItemCell";
import BLButtons from "./BLButtons";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];


const BLItemsTable = ({ bl, setItemIdle, setItemBlocked, setItemStarted, setItemOnReview, setItemDone, setItemProgress, setItemRemove, dataVersion }) => {
    const [dataTable, setDataTable] = useState(bl.map(t => {
        return ({
            title: t.title,
            status: t.status,
            id: t.id,
            progress: t.progress,
            setIdle: (id) => setItemIdle(id),
            setBlocked: (id) => setItemBlocked(id),
            setStarted: (id) => setItemStarted(id),
            setOnReview: (id) => setItemOnReview(id),
            setDone: (id) => setItemDone(id),
            setProgress: (id, value) => setItemProgress(id, value),
            setRemove: (id) => setItemRemove(id),
        }
        )
    }));

    useEffect(() => {
        const temp = bl.map(t => {
            return ({
                title: t.title,
                status: t.status,
                id: t.id,
                progress: t.progress,
                setIdle: (id) => setItemIdle(id),
                setBlocked: (id) => setItemBlocked(id),
                setStarted: (id) => setItemStarted(id),
                setOnReview: (id) => setItemOnReview(id),
                setDone: (id) => setItemDone(id),
                setProgress: (id, value) => setItemProgress(id, value),
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

            <Column dataField="status" caption="Status" groupIndex={1} />

            <Column
                dataField="title"
                caption="Tasks"
                dataType="string"
                alignment="left"
                allowGrouping={false}
            />
            <Column
                caption="Progress"
                dataType="string"
                alignment="center"
                allowGrouping={false}
                cellRender={BLItemCell}
            />
            <Column

                caption="Options"
                dataType="string"
                alignment="center"
                allowGrouping={false}
                cellRender={BLButtons}
            />

            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
        </DataGrid>
    )
};

export default BLItemsTable;