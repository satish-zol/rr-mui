import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import Input from "material-ui/Input";
import Select from 'material-ui/Select';

import {
    DataTypeProvider,
    EditingState,
    SortingState,
    SelectionState,
    FilteringState,
    IntegratedFiltering,
    IntegratedSorting,
    IntegratedSelection,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
    TableColumnResizing,
    TableEditRow,
    TableEditColumn,
    TableFilterRow,
    TableSelection,
} from '@devexpress/dx-react-grid-material-ui';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles';

//used for infinite scroll
class Row extends React.Component {
    componentDidMount() {
        this.props.onShow(this.props.row);
    }

    render() {
        const {children} = this.props;
        return <tr>{children}</tr>;
    }
}

const availableValues = [
    {id: "SS1", name: 'SS1'},
    {id: "SS2", name: 'SS2'},
    {id: "SS3", name: 'SS3'},
    {id: "SS4", name: 'SS4'},
    {id: "SS5", name: 'SS5'},
    {id: "SS6", name: 'SS6'},
    {id: "SS7", name: 'SS7'}
];

const style = theme => ({
	  title:{
			  color: theme.palette.text.primary,
    },
});
const getRowId = row => row.id;
const CurrencyFormatter = ({ value }) => 
    <b style={{color: '#2196F3'}}>${value}</b>;

const CurrencyTypeProvider = props => (
    <DataTypeProvider
        formatterComponent={CurrencyFormatter}
        {...props}
    />
);

const LookupEditCell = ({ availableValues, value, onValueChange }) => {
    return (
        <VirtualTable.Cell>
            <Select
                value={value}
                onChange={event => onValueChange(event.target.value)}
                input={<Input />}
            >
                {availableValues.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.name}
                    </MenuItem>
                ))}
            </Select>
        </VirtualTable.Cell>
    );
};

const EditCell = props => {
    if (props.column.name === 'status') {
        return (
            <LookupEditCell
                {...props}
                availableValues={availableValues}
            />
        );
    }
    return <VirtualTable.Cell {...props} />;
};

const TableRow = ({row, ...props}) => (
	  <VirtualTable.Row
        {...props}
        onClick={() => alert(JSON.stringify(row))}
        style={{
            cursor: 'pointer'
        }}
    />
);

class ActiveLeads extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            columns: [
	              {name: 'id', title: 'ID'},
	              {name: 'name', title:'Name'},
	              {name: 'email', title: 'Email'},
	              {name: 'company', title: 'Company'},
	              {name: 'phone', title: 'Phone'},
	              {name: 'designation', title: 'Designation'},
	              {name: 'city', title: 'City'},
	              {name: 'country', title: 'Country'},
                {name: 'postal_code', title: 'Postal Code'},
                {name: 'created_at', title: 'Created At'},
                {name: 'updated_at', title: 'Updated At'},
                {name: 'message', title: 'Message'},
                {name: 'publisher', title: 'Publisher'},
                {name: 'report_title', title: 'Report Title'},
                {name: 'report_code', title: 'Report Code'},
                {name: 'price', title: 'Price'},
                {name: 'edition', title: 'Edition'},
                {name: 'category', title: 'Category'},
                {name: 'status', title: 'Status', getCellValue: row => (row.status ? row.status : undefined)},
                {name: 'report_type', title: 'Report Type'},
            ],
            defaultColumnWidths: [
                {columnName: 'id', width: 120},
	              {columnName: 'name', width: 180},
	              {columnName: 'email', width: 250},
	              {columnName: 'company', width: 250},
	              {columnName: 'phone', width: 150},
	              {columnName: 'designation', width: 250},
	              {columnName: 'city', width: 150},
	              {columnName: 'country', width: 180},
                {columnName: 'postal_code', width: 100},
                {columnName: 'publisher', width: 200},
                {columnName: 'report_title', width: 400},
                {columnName: 'report_code', width: 100},
                {columnName: 'price', width: 200},
                {columnName: 'edition', width: 250},
                {columnName: 'category', width: 300},
                {columnName: 'status', width: 150},
                {columnName: 'report_type', width: 300},
                {columnName: 'created_at', width: 180},
                {columnName: 'updated_at', width: 180},
                {columnName: 'message', width: 300},
            ],
            tableColumnExtensions: [
                {columnName: 'price', align: 'center'},
            ],
            editingColumnExtensions: [
                {
                    columnName: 'status',
                    createRowChange: (row,value) => {
                        return({status: {id: value}})
                    },
                }
            ],
            currencyColumns: ['price'],
            rows: [],
            editingRows: [],
            addedRows: [],
            changeRows: {},
            sorting: [],
            selection: [],
            currentPage: 0,
            pageSize: 5,
            pageSizes: [5, 10, 15],
            loading: true,
            open: false,
        };

        this.changeColumnWidths = (columnWidths) => {
            this.setState({ columnWidths });
        };
        this.changeSorting = sorting => this.setState({loading: true, sorting});
        this.changeAddedRows = this.changeAddedRows.bind(this);
        this.changeEditingRows = this.changeEditingRows.bind(this);
        this.changeChangedRows = this.changeChangedRows.bind(this);
        this.commitChanges = this.commitChanges.bind(this);
        this.changeSelection = selection => this.setState({ selection });
        //this.rowShown = this.rowShown.bind(this);
        //this.handleReceiveNewLeads = this.handleReceiveNewLeads.bind(this);
				//this.loadData = this.loadData.bind(this);
        //this.editCellComponent = this.editCellComponent.bind(this);
        //this.changeCurrentPage = currentPage => this.setState({ currentPage });
        // this.changePageSize = pageSize => this.setState({ pageSize });
    }

    changeAddedRows(addedRows) {
        const initialized = addedRows.map(row => (Object.keys(row).length ? row : {country: 'UK'}));
        this.setState({addedRows: initialized});
    }

    changeEditingRows(editingRows) {
        this.setState({editingRows});
    }

    changeChangedRows(changedRows) {
        this.setState({changedRows});
    }

    commitChanges({added, changed, deleted}) {
        let {rows} = this.state;
        if(added) {
            const startingAddedId = (rows.length -1) > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if(changed) {
            rows = rows.map(row => (changed[row.id] ? {...row, ...changed[row.id] } : row));
        }
        if(deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({rows});
    }

    componentDidMount() {
        let websocket = new WebSocket('ws://localhost:4000/cable');

        websocket.onmessage = (event) => {
            this.setState({loading: false});
            this.props.actions.getLeads();
        }
    }

    render() {
        const {leads, actions} = this.props;
        const { columns, defaultColumnWidths, currencyColumns, tableColumnExtensions, editingRows, changedRows, addedRows, selection, loading, editingColumnExtensions} = this.state;
        return (
            <div>
                <span>Total rows selected: {selection.length}</span>
                <Paper style={{ position: 'relative' }}>
                    <Grid
                        rows={leads}
                        columns={columns}
                        getRowId={getRowId}
                        {...actions}
                    >
                        <CurrencyTypeProvider for={currencyColumns} />
                        <EditingState
                            columnExtensions={editingColumnExtensions}
                            editingRows={editingRows}
                            onEditingRowsChange={this.changeEditingRows}
                            changedRows={changedRows}
                            onChangedRowsChange={this.changeChangedRows}
                            addedRows={addedRows}
                            onAddedRowsChange={this.changeAddedRows}
                            onCommitChanges={this.commitChanges}
                        />
                        <FilteringState defaultFilters={[]} />
                        <SortingState sorting={this.state.sorting}
                                      onSortingChange={this.changeSorting} />
                        <SelectionState
                            selection={selection}
                            onSelectionChange={this.changeSelection}
                        />
                        <IntegratedFiltering />
                        <IntegratedSorting />
                        <IntegratedSelection />
                        <VirtualTable rowComponent={TableRow} columnExtensions={tableColumnExtensions} />
                        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                        <TableSelection showSelectAll />
                        <TableHeaderRow showSortingControls />
                        <TableEditRow cellComponent={EditCell} />
                        <TableEditColumn
                            showAddCommand={!addedRows.length}
                            showEditCommand
                            showDeleteCommand
                        />
                        <TableFilterRow />
                    </Grid>
                    {loading && <CircularProgress size={50} /> }
                </Paper>
            </div>
        );
    }
};


export default ActiveLeads;
