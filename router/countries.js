import { Router } from "express";
import { body } from "express-validator";
import { createNewCountry, deleteCountryByCode, getAllCountries, getCountryByCode, updateCountryByCode  } from "../controller/countries.js";

export const countriesRouter = Router();

// Base API URL ------------------------------------------------------------
countriesRouter
    .route('/')
    .post(body('alpha2Code').isLength({ min: 2, max: 2 }), body('alpha3Code').isLength({ min: 3, max: 3 }), createNewCountry)
    .get(getAllCountries)
    .all();

// Single Country URL ------------------------------------------------------
countriesRouter
    .route('/:code')
    .get(getCountryByCode)
    .put(body('alpha2Code').isLength({ min: 2, max: 2 }), body('alpha3Code').isLength({ min: 3, max: 3 }), updateCountryByCode)
    .delete(deleteCountryByCode)
    .all();