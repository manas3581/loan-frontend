import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  border:0,
  outline:0,
  borderRadius:5
};

export default function Info({open,handleClose}) {


  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 id="modal-modal-title text-center" variant="h6" component="h2">
          Loan Calculation Details
          </h1>
          <p>Our loan calculation uses <strong>compound interest</strong> to determine your monthly payments based on the loan amount, term, and annual interest rate.</p>
          <p><strong>Formula:</strong></p>
          <pre>Total Payment = (P * r * (1 + r)^n) / ((1 + r)^n - 1)</pre>
          <p>Where:</p>
          <ul>
            <li><strong>P</strong>: Principal loan amount</li>
            <li><strong>r</strong>: Yearly interest rate </li>
            <li><strong>n</strong>: Total number of payments (in Years)</li>
          </ul>
          <button className='btn btn-primary my-2 mx-3' onClick={handleClose}>OK</button>
        </Box>
      </Modal>
    </div>
  );
}
