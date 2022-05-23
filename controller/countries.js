// #########################################################################
// Basic CRUD
// #########################################################################

import { validationResult } from "express-validator";

let countries =
    [
        {
            id: 1,
            name: 'New Zealand',
            alpha2Code: 'NZ',
            alpha3Code: 'NZL',
            visited: true
        },
        {
            id: 2,
            name: 'Australia',
            alpha2Code: 'AU',
            alpha3Code: 'AUS',
            visited: true
        },
        {
            id: 3,
            name: 'Mexico',
            alpha2Code: 'MX',
            alpha3Code: 'MEX',
            visited: false
        },
        {
            id: 4,
            name: 'Peru',
            alpha2Code: 'PE',
            alpha3Code: 'PER',
            visited: false
        },
        {
            id: 5,
            name: 'South Africa',
            alpha2Code: 'ZA',
            alpha3Code: 'ZAF',
            visited: false
        }
    ]


// Create ------------------------------------------------------------------
export const createNewCountry = (req, res) => {
    const { name, alpha2Code, alpha3Code } = req.body;
    let maxid = 0;
    countries.forEach(country => {
        if (country.id > maxid) { maxid = country.id + 1 }
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!countries.find(country => {
        return (country.alpha2Code === alpha2Code.toUpperCase() || country.alpha3Code === alpha3Code.toUpperCase());
    })) {
        countries.push(
            {
                id: maxid,
                name: name,
                alpha2Code: alpha2Code.toUpperCase(),
                alpha3Code: alpha3Code.toUpperCase()
            }
        )
    }
    res.status(201).json(countries);
}

// Read --------------------------------------------------------------------
// All ----------------
export const getAllCountries = (req, res) => {
    let sortedCountries = [];
    if (req.query.sort === 'true') {
        sortedCountries = countries.sort((a, b) => {
            const fa = a.name.toLowerCase();
            const fb = b.name.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    } else {
        sortedCountries = countries.sort((a, b) => { return a.id - b.id });
    }

    let selectedCountries = [];

    if (req.query.visited === 'true') {
        selectedCountries = sortedCountries.filter(country => {
            return (country.visited == true);
        })
    } else if (req.query.visited === 'false') {
        selectedCountries = sortedCountries.filter(country => {
            return (country.visited == false);
        })
    } else { selectedCountries = countries }

    res.status(200).json({ countries: selectedCountries });

}
// One by ID ---------
export const getCountryByCode = (req, res) => {
    const { code } = req.params;

    const selectedCountry = countries.find(country => {
        return (country.alpha2Code == code.toUpperCase() || country.alpha3Code == code.toUpperCase());
    });

    selectedCountry ? res.status(200).json({ countries: selectedCountry }) : (
        res.status(500).json(
            {
                error:
                {
                    status: 500,
                    message: `Country with code ${code.toUpperCase()} not found!`
                }
            }
        )
    )
}

// Update ------------------------------------------------------------------
export const updateCountryByCode = (req, res) => {
    const { code } = req.params;
    const { id, name, alpha2Code, alpha3Code, visited } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updateCountryIndex = countries.findIndex(country => {
        return (country.alpha2Code == code.toUpperCase() || country.alpha3Code == code.toUpperCase())
    });

    countries[updateCountryIndex] =
    {
        id: id,
        name: name,
        alpha2Code: alpha2Code,
        alpha3Code: alpha3Code,
        visited: visited
    }
    res.status(200).json({countries: countries[updateCountryIndex]});
}

// Delete ------------------------------------------------------------------
export const deleteCountryByCode = (req, res) => {
    const { code } = req.params;
    const visitedCountry = countries.find(country => {
        return (country.alpha2Code == code.toUpperCase() || country.alpha3Code == code.toUpperCase())
    });

    visitedCountry.visited = true;

    visitedCountry ? res.status(200).json({ deletedCountry: visitedCountry }) : res.status(404).json(
        {
            error:
            {
                status: 404,
                message: `Country with code ${code.toUpperCase()} not found!`
            }
        }
    )
}