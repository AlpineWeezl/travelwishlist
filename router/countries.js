import { Router } from "express";
import { createNewCountry, deleteCountryById, getAllCountries, getCountryById, updateCountryById } from "../controller/countries";

export const countriesRouter = Router();

// Base API URL ------------------------------------------------------------
countriesRouter
    .route('/')
    .post(createNewCountry)
    .get(getAllCountries)
    .all();

// Single Country URL ------------------------------------------------------
countriesRouter
    .route('/:id')
    .get(getCountryById)
    .put(updateCountryById)
    .delete(deleteCountryById)
    .all();