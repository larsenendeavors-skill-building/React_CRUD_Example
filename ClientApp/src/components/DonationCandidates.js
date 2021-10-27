import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAll, Delete } from '../Actions/DonationCandidate'
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles,
    withStyles,
    ButtonGroup, Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DonationCandidateForm from "./DonationCandidateForm";
import {useToasts} from "react-toast-notifications";

const styles = makeStyles({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper :{
        margin: "2rem",
        padding: "2rem"
    }
});

const DonationCandidates = (props) => {
    
    const [currentId, setCurrentId] = useState(0);
    
    const { addToast } = useToasts();
    
    const onDelete = id => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            props.deleteDonationCandidate(id, () => {
                addToast("Deleted successfully");
            });
        }
    };

    useEffect(() => {
        props.fetchAllDonationCandidates();
    }, [props.fetchAllDonationCandidates]);
    
    const classes = styles();
    
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DonationCandidateForm {...({currentId,setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Mobile
                                    </TableCell>
                                    <TableCell>
                                        Blood Group
                                    </TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.donationCandidateList.map((record, index) => {
                                    return (
                                        <TableRow key={index} hover>
                                            <TableCell>
                                                {
                                                    record.fullName
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    record.mobileNumber
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    record.bloodGroup
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <ButtonGroup variant={"text"}>
                                                    <Button><EditIcon color={"primary"} onClick={() => {setCurrentId(record.id)}}/></Button>
                                                    <Button><DeleteIcon color={"secondary"} onClick={() => {onDelete(record.id)}}/></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
};

const mapStateToProps = state => ({ donationCandidateList: state.donationCandidate.list });

const mapActionToProps = {
    fetchAllDonationCandidates: fetchAll,
    deleteDonationCandidate: Delete
};

export default connect(mapStateToProps, mapActionToProps)(DonationCandidates);