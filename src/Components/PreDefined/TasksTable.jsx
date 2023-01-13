import React, { useState, useEffect } from "react";
import TasksCell from "./TasksCell";
import TasksButtons from "./TasksButtons";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];


const TasksTable = ({ tasks, setTaskPending, setTaskOpen, setTaskDone, setTaskDelete, dataVersion }) => {
    const [dataTable, setDataTable] = useState(tasks.map(t => {
        return ({
            title: t.title,
            status: t.status,
            id: t.id,
            setPending: (id) => setTaskPending(id),
            setOpen: (id) => setTaskOpen(id),
            setDone: (id) => setTaskDone(id),
            setDelete: (id) => setTaskDelete(id),
        }
        )
    }));

    useEffect(() => {
        const temp = tasks.map(t => {
            return ({
                title: t.title,
                status: t.status,
                id: t.id,
                setPending: (id) => setTaskPending(id),
                setOpen: (id) => setTaskOpen(id),
                setDone: (id) => setTaskDone(id),
                setDelete: (id) => setTaskDelete(id),
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
                cellRender={TasksCell}
            />
            <Column

                caption="Options"
                dataType="string"
                alignment="center"
                allowGrouping={false}
                cellRender={TasksButtons}
            />

            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
        </DataGrid>
    )
};

export default TasksTable;