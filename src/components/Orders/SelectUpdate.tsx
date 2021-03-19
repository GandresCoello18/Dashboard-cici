/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { makeStyles, FormControl, InputLabel, Select, Button, MenuItem } from '@material-ui/core';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toast';
import { UpdateStatusOrden } from '../../api/orders';
import { MeContext } from '../../context/contextMe';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface Props {
  ActualState: string;
  idOrden: string;
  setReloadOrders: Dispatch<SetStateAction<boolean>>;
}

export const SelectUpdate = ({ ActualState, idOrden, setReloadOrders }: Props) => {
  const classes = useStyles();
  const { token } = useContext(MeContext);
  const [Status, setStatus] = useState<any>('');
  const [open, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [Loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const FetchUpdate = async () => {
      try {
        await UpdateStatusOrden({ token, idOrden, status: Status });
        setLoading(false);

        setReloadOrders(true);
        setStatus('');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    if (ActualState && Status) {
      if (ActualState !== Status) {
        FetchUpdate();
        setLoading(true);
      }
    }
  }, [Status, ActualState, token, idOrden, setReloadOrders]);

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          setOpen(true);
          setVisible(true);
        }}
      >
        {Loading ? 'Cargando...' : 'Editar'}
      </Button>
      {visible && (
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-controlled-open-select-label'>Estados</InputLabel>
          <Select
            labelId='demo-controlled-open-select-label'
            id='demo-controlled-open-select'
            open={open}
            onClose={() => {
              setOpen(false);
              setVisible(false);
            }}
            onOpen={() => setOpen(true)}
            onChange={event => setStatus(event.target.value)}
          >
            <MenuItem value='Pending'>Pendiente</MenuItem>
            <MenuItem value='Paid'>Pagado</MenuItem>
            <MenuItem value='Cancelled'>Cancelado</MenuItem>
            <MenuItem value='Refunded'>Rembolsado</MenuItem>
          </Select>
        </FormControl>
      )}
    </>
  );
};
