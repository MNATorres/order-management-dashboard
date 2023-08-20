import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableFooter, TablePagination } from "@mui/material";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  cliente: string,
  status: string,
  createDate: string,
  shippingAddress: string,
  shippingPromise: string,
  id: number
) {
  return {
    cliente,
    status,
    createDate,
    shippingAddress,
    shippingPromise,
    id,
    products: [
      {
        id: 1,
        title: "title",
        description: "descriptions",
        url: "Link",
        price: "$100",
        quantity: 30
      },
      {
        id: 1,
        title: "title",
        description: "descriptions",
        url: "Link",
        price: "$100",
        quantity: 30
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.cliente}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.createDate}</TableCell>
        <TableCell align="right">{row.shippingAddress}</TableCell>
        <TableCell align="right">{row.shippingPromise}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Url</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productRow) => (
                    <TableRow key={Math.random()}>
                      <TableCell component="th" scope="row">
                        {productRow.id}
                      </TableCell>
                      <TableCell>{productRow.title}</TableCell>
                      <TableCell align="right">{productRow.description}</TableCell>
                      <TableCell align="right">{productRow.url}</TableCell>
                      <TableCell align="right">{productRow.price}</TableCell>
                      <TableCell align="right">{productRow.quantity}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Frozen yoghurt", 'status', '01/01/1995', 'direccion', 'entrega', 3.99),
  createData("Ice cream sandwich", 'status', '01/01/1995', 'direccion', 'entrega', 4.99),
  createData("Eclair", 'status', '01/01/1995','direccion', 'entrega', 3.79),
  createData("Cupcake", 'status', '01/01/1995', 'direccion', 'entrega', 2.5),
  createData("Gingerbread", 'status', '01/01/1995', 'direccion', 'entrega', 1.5),
  createData("Matias", 'status', '01/01/1995', 'direccion', 'entrega', 3.99),
  createData("Isdasasasandwich", 'status', '01/01/1995', 'direccion', 'entrega', 4.99),
  createData("Ecl", 'status', '01/01/1995', 'direccion', 'entrega', 3.79),
  createData("cake", 'status', '01/01/1995','direccion', 'entrega', 2.5),
  createData("Gerbrd", 'status', '01/01/1995', 'direccion', 'entrega', 1.5),
  createData("yoghurt", 'status', '01/01/1995', 'direccion', 'entrega', 3.99),
  createData("esandwich", 'status', '01/01/1995', 'direccion', 'entrega', 4.99),
  createData("Eir", 'status', '01/01/1995', 'direccion', 'entrega', 3.79),
  createData("Cake", 'status', '01/01/1995', 'direccion', 'entrega', 2.5),
  createData("rbread", 'status', '01/01/1995','direccion', 'entrega', 1.5),
];

export default function OrderList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Cliente</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">CreateDate</TableCell>
            <TableCell align="right">ShippingAddress</TableCell>
            <TableCell align="right">ShippingPromise</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{marginBottom: 10}}>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.cliente} row={row} />
          ))}
        </TableBody>
        <TableFooter
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "red",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableRow>
            <TablePagination
              sx={{ borderBottom: 0 }}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
