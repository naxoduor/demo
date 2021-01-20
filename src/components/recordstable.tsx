import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];


export default function RecordsTable(props) {
    const classes = useStyles();
    let userRecordsList
    if(props && props.records && props.records.recordsList){
      userRecordsList=props.records.recordsList
    }
    console.log("print props in tablennnnnnnnnnnnnn", userRecordsList)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description&nbsp;(g)</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userRecordsList.map((record) => 
          record.length>0 && record.map((singleRecord)=>
          (
            <TableRow>
              <TableCell component="th" scope="row">
                {singleRecord.title}
              </TableCell>
              <TableCell align="right">{singleRecord.title}</TableCell>
              <TableCell align="right">{singleRecord.description}</TableCell>
            </TableRow>
          )
          )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

}
