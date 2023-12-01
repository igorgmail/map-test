import * as React from 'react';
import { FC } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import Card from './Card'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type TCardModalProps = {
  open: boolean,
  data: any,
  handleClose: () => void,

}
const CardModal: FC<TCardModalProps> = ({ open, handleClose, data }) => {
  console.log("▶ ⇛ data:", data);
  // const [open, setOpen] = React.useState(modalShow);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {data.var_1.header}
            </Typography>
            <Card variant={data.var_1}></Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default CardModal;



