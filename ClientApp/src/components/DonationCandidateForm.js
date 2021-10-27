import React, {useEffect, useState} from 'react';
import {
    Grid,
    TextField,
    makeStyles,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button,
    FormHelperText
} from "@material-ui/core";
import useForm from "./useForm";
import {create, update, Delete} from "../Actions/DonationCandidate";
import {connect} from "react-redux";
import {useToasts} from "react-toast-notifications";

const styles = makeStyles(theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            minWidth: 230
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230
    }, 
    smMargin: {
        margin: theme.spacing(1)
    }
}));

const initialValues = {
    fullName: "",
    mobileNumber: "",
    email:"",
    age: "",
    bloodGroup: "",
    address:""
}

const DonationCandidateForm = (props) => {
    
    const {addToast} = useToasts();        
    const validate = (fieldValues = values) => {
        let temp={...errors};
        if ('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required";
        if ('mobileNumber' in fieldValues)
        temp.mobileNumber = fieldValues.mobileNumber ? "" : "This field is required";
        if ('age' in fieldValues)
        temp.age = fieldValues.age ? "" : "This field is required";
        if ('email' in fieldValues)
        temp.email = (/^$|.*@.*..*/).test(fieldValues.email) ? "" : "This field is not valid";
        if ('bloodGroup' in fieldValues)
        temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required";
        setErrors({
            ...temp
        });
        if (fieldValues == values)
        return Object.values(temp).every(x => x === "");
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({...props.donationCandidateList.find(x => x.id === props.currentId)});
        }
    }, [props.currentId]);
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialValues, validate, props.setCurrentId);
    
    const classes = styles();
    
    const handleSubmit = e => {
        const onSuccess = () => {
            addToast("Submitted successfully", {appearance: "success"});
            resetForm();
        }
        
        e.preventDefault();
        if(validate()) {
            if (props.currentId !== 0) {
                props.updateDonationCandidate(props.currentId, values, onSuccess)
            } else {
                props.createDonationCandidate(values, onSuccess);
            }
        }
    }
    
    return (
        <form autoComplete={"off"} noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                      name="fullName"
                      variant="outlined"
                      label="Full Name"
                      value={values.fullName}
                      onChange={handleInputChange}
                      {...(errors.fullName && {error: true, helperText: errors.fullName})}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                    />
                    <TextField
                        name="age"
                        variant="outlined"
                        label="Age"
                        value={values.age}
                        onChange={handleInputChange}
                        {...(errors.age && {error: true, helperText: errors.age})}
                    />                    
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="mobileNumber"
                        variant="outlined"
                        label="Mobile"
                        value={values.mobileNumber}
                        onChange={handleInputChange}
                        {...(errors.mobileNumber && {error: true, helperText: errors.mobileNumber})}
                    />
                    <FormControl variant="outlined" className={classes.formControl}
                                 {...(errors.bloodGroup && {error: true} )}>
                        <InputLabel>Blood Group</InputLabel>
                        <Select name="bloodGroup"
                                value={values.bloodGroup}
                                onChange={handleInputChange}
                        >
                            <MenuItem value={""}>Select Blood Group</MenuItem>
                            <MenuItem value={"A+"}>A+</MenuItem>
                            <MenuItem value={"A-"}>A-</MenuItem>
                            <MenuItem value={"B+"}>B+</MenuItem>
                            <MenuItem value={"B-"}>B-</MenuItem>
                            <MenuItem value={"AB+"}>AB+</MenuItem>
                            <MenuItem value={"AB-"}>AB-</MenuItem>
                            <MenuItem value={"O+"}>O+</MenuItem>
                            <MenuItem value={"O-"}>O-</MenuItem>
                        </Select>
                        {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="address"
                        variant="outlined"
                        label="Address"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                </Grid>
                <div>
                    <Button className={classes.smMargin} variant={"contained"} color={"primary"} type={"submit"}>Submit</Button>
                    <Button className={classes.smMargin} variant={"contained"} color={"secondary"} onClick={resetForm}>Reset</Button>
                </div>
            </Grid>
        </form>);
};

const mapStateToProps = state => ({ donationCandidateList: state.donationCandidate.list });

const mapActionToProps = {
    createDonationCandidate: create,
    updateDonationCandidate: update,
    deleteDonationCandidate: Delete
};


export default connect(mapStateToProps, mapActionToProps)(DonationCandidateForm);