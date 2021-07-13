import DataTable from 'react-data-table-component';

const customStyles = {
    table: {
        style: {
            backgroundColor: 'transparent'
        }
    },
    header: {
        style: {
            display: 'none',
        }
    },
    headRow: {
        style: {
            background: 'transparent',
            fontWeight: 'bold',
            color: '#344ab8'
        }
    },
    headCells: {
        style: {
          color: '',
          fontSize: '18px',
          fontWeight: 'bold'
        },
      },
    rows: {
        style: {
            marginTop: '-18px',
            padding: '1px 1px',
            borderTop: '1px solid #E1E3EA',
            paddingBottom: '18px',
            fontSize: '18px',
            fontWeight: 'bold'
        }
    }
}

const Table = ({ data, columns, title = "Table", ...props }) => {
    return (
        <DataTable
            {...props}
            title={''}
            data={data}
            columns={columns}
            customStyles={customStyles}
        />
    )
}

export default Table;