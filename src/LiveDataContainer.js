import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    TableContainer,
    Paper,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
    Table,
} from '@material-ui/core';
import { initialiseLiveDataSaga, cancelSubscription } from './actions/liveData.actions';

const style = {
  border: '1px solid yellow',
  margin: 6,
  padding: 8,
};

function LiveDataContainer() {
  const dispatch = useDispatch();
  const [state, setState] = useState({data: [], hasMore: true});

  useEffect(() => {
    dispatch(initialiseLiveDataSaga('live-data/demo'));
    return () => {
      dispatch(cancelSubscription());
    }
  }, []);

  const liveDataState = useSelector((state) => state.liveData);
  
  useEffect(() => {
    setState({ hasMore: true, data: state.data.concat(liveDataState) })
  }, [liveDataState]);

  return (
    <div>
    <h2>Live Sensor Data Table</h2>
    <TableContainer style={style} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sensor Name</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>Recorded Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((data, index) => (
              <TableRow key={data && index}>
                <TableCell>{data && data.name}</TableCell>
                <TableCell>{data && data.value}</TableCell>
                <TableCell>{data && data.unit}</TableCell>
                <TableCell>{data && data.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
  )
}

export default LiveDataContainer
