import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PaymentIcon from '@mui/icons-material/Payment';
import './Stepper.css';


export default function StepperComponent({activeStep}) {

    const steps = [
        {label: 'Shipping Details', icon: LocalShippingIcon},
        {label: 'Confirm Order', icon: LibraryAddCheckIcon},
        {label: 'Payment', icon: PaymentIcon}]

    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, i) => (
                    <Step>
                        {i < activeStep
                            ? <StepLabel>{step.label}</StepLabel>
                            : <StepLabel StepIconComponent={step.icon}>{step.label}</StepLabel> }
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
