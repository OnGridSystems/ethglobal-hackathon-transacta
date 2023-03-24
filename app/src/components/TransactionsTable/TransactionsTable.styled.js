import styled from "@emotion/styled";
import { Paper, TableContainer } from "@mui/material";

export const MuiTable = styled(TableContainer)`
  border-radius: 24px;
  padding: 5px 25px 5px 25px;
  .MuiTableCell-root {
    font-family: Inter;

    text-align: center;
    :first-child {
      text-align: start;
    }
  }
  .MuiTableBody-root {
    .MuiTableCell-root {
      padding-top: 25px;
      padding-bottom: 25px;
      border: 0;
    }
    .MuiTableRow-root {
      :nth-child(even) {
        background: #f1f7f8;
      }
    }
  }
  .MuiTableRow-head {
    opacity: 0.5;
  }
`;

export const TablePaper = styled(Paper)`
  box-shadow: none;
`;
