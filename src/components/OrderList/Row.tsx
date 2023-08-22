import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { OrderData } from "../../domain/OrderData";

export default function Row(props: { row: OrderData }) {
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
          {row.client}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.createDate.toLocaleDateString()}</TableCell>
        <TableCell align="right">{row.shippingAddress}</TableCell>
        <TableCell align="right">{row.shippingPromise.toLocaleDateString()}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
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
                  {row.items.map((productRow) => (
                    <TableRow key={productRow._id}>
                      <TableCell component="th" scope="row">
                        {productRow.id}
                      </TableCell>
                      <TableCell>{productRow.title}</TableCell>
                      <TableCell align="right">
                        {productRow.description}
                      </TableCell>
                      <TableCell align="right">
                        <Link href={productRow.url} underline="hover">
                          <LaunchIcon />
                        </Link>
                      </TableCell>
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
