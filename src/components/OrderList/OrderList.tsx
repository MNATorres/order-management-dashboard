import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter, TablePagination } from "@mui/material";
import { MockedOrder } from "../../services/api";
import TablePaginationActions from "./TablePaginationActions";
import Row from "./Row";
import OrderFilter from "./OrderFilter";
import { useFilteredOrders } from "../../hooks/useFilterOrders";


export default function OrderList()  {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {orders, filterOrders} = useFilteredOrders()

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
            <TableCell>
              <OrderFilter onFilter={filterOrders} />
            </TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">CreateDate</TableCell>
            <TableCell align="right">ShippingAddress</TableCell>
            <TableCell align="right">ShippingPromise</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : orders
          ).map((order: MockedOrder) => (
            <Row key={order.id} row={order} />
          ))}
        </TableBody>
        <TableFooter
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#1976d2",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableRow>
            <TablePagination
              sx={{ borderBottom: 0}}
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={orders.length}
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
